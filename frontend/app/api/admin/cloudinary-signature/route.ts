import { NextRequest, NextResponse } from 'next/server';
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
    const body = await req.json();
    const barberId = String(body.barberId || '');
    const type = body.type === 'video' ? 'video' : 'image';

    if (!barberId) {
      return NextResponse.json({ error: 'barberId is required' }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `mg-studio/posts/${barberId}`;

    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },
      process.env.CLOUDINARY_API_SECRET || ''
    );

    return NextResponse.json(
      {
        success: true,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        timestamp,
        folder,
        resourceType: type,
        signature,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create upload signature' },
      { status: 500 }
    );
  }
}
