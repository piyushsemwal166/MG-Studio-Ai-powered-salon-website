import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Post } from '@/lib/models';
import { verifyAdminPassword, createUnauthorizedResponse } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  if (!verifyAdminPassword(req)) {
    return createUnauthorizedResponse();
  }

  try {
    await connectDB();

    const contentType = req.headers.get('content-type') || '';

    let barberId = '';
    let barberName = '';
    let type: 'image' | 'video' = 'image';
    let title = '';
    let caption = '';
    let url = '';
    let cloudinaryId = '';

    // New flow: metadata only (file uploaded directly to Cloudinary from browser)
    if (contentType.includes('application/json')) {
      const body = await req.json();
      barberId = String(body.barberId || '');
      barberName = String(body.barberName || '');
      type = body.type === 'video' ? 'video' : 'image';
      title = String(body.title || '');
      caption = String(body.caption || '');
      url = String(body.url || '');
      cloudinaryId = String(body.cloudinaryId || '');

      if (!barberId || !barberName || !type || !title || !url || !cloudinaryId) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
    } else {
      // Legacy fallback flow: upload binary through this API route
      const formData = await req.formData();
      const file = formData.get('file') as File;
      barberId = String(formData.get('barberId') || '');
      barberName = String(formData.get('barberName') || '');
      type = formData.get('type') === 'video' ? 'video' : 'image';
      title = String(formData.get('title') || '');
      caption = String(formData.get('caption') || '');

      if (!file || !barberId || !barberName || !type || !title) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `mg-studio/posts/${barberId}`,
            resource_type: type === 'video' ? 'video' : 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      }) as any;

      url = result.secure_url;
      cloudinaryId = result.public_id;
    }

    // Save post to MongoDB
    const post = await Post.create({
      barberId: parseInt(barberId),
      barberName,
      type,
      url,
      cloudinaryId,
      title,
      caption: caption || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Post created successfully',
        post,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload post' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const barberId = searchParams.get('barberId');

    let query = {};
    if (barberId) {
      query = { barberId: parseInt(barberId) };
    }

    const posts = await Post.find(query).sort({ createdAt: -1, _id: -1 });

    return NextResponse.json(
      {
        success: true,
        posts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
