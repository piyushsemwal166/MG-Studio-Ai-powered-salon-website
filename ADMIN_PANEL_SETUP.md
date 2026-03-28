# Admin Panel Setup Guide

## Overview

The admin panel allows authorized personnel to upload, edit, and delete photos and videos for each barber's portfolio. All uploads are stored on Cloudinary, and metadata is saved to MongoDB.

## Features

✅ **Admin Authentication** - Password-protected access  
✅ **Multi-file Upload** - Support for images and videos  
✅ **Cloudinary Integration** - Secure cloud storage  
✅ **MongoDB Backend** - Persistent data storage  
✅ **CRUD Operations** - Create, Read, Update, Delete posts  
✅ **Edit Captions** - Update post titles and descriptions  
✅ **Dynamic Portfolio** - Automatically displays in barber portfolios  

## Prerequisites

Before setting up the admin panel, you need:

1. **MongoDB Atlas Account** - For database
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account and cluster
   - Get your connection string

2. **Cloudinary Account** - For file storage
   - Go to [Cloudinary](https://cloudinary.com)
   - Sign up for a free account
   - Get your cloud name, API key, and API secret

## Setup Instructions

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

The required packages are already added to `package.json`:
- `mongoose` - MongoDB ODM
- `cloudinary` - Cloud storage and delivery
- `next-cloudinary` - Next.js integration

### Step 2: Configure Environment Variables

Create a `.env.local` file in the `frontend` directory with your credentials:

```env
# Google Gemini API Key (existing)
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Admin Panel
ADMIN_PASSWORD=your_secure_admin_password_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 3: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Click "Connect" → "Drivers"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Paste in `.env.local` as `MONGODB_URI`

### Step 4: Get Cloudinary Credentials

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy these values from your dashboard:
   - **Cloud Name** (visible at top)
   - **API Key**
   - **API Secret**
3. Add to `.env.local`

### Step 5: Start the Application

```bash
npm run dev
```

## Usage

### Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Enter your admin password
3. You'll see the admin dashboard

### Uploading Posts

1. **Select Barber** - Choose which barber the post belongs to
2. **Select Type** - Choose Image or Video
3. **Upload File** - Click to upload or drag and drop
4. **Add Title** - Required (e.g., "Fade Cutting", "Hair Styling")
5. **Add Caption** - Optional description
6. **Submit** - Click "Upload Post" to save

### Editing Posts

1. Find the post in the gallery
2. Click the "Edit" button
3. Update the title and/or caption
4. Click "Save" to update

### Deleting Posts

1. Find the post in the gallery
2. Click the "Delete" button
3. Confirm deletion in the dialog
4. The post will be removed from both Cloudinary and MongoDB

## File Structure

```
frontend/
├── app/
│   ├── admin/
│   │   └── page.tsx                 # Admin dashboard
│   └── api/
│       └── admin/
│           └── posts/
│               ├── route.ts         # POST/GET for all posts
│               └── [id]/
│                   └── route.ts     # PUT/DELETE for individual posts
├── components/
│   ├── admin-auth.tsx              # Login component
│   ├── admin-upload-form.tsx        # Upload form
│   ├── posts-grid.tsx              # Posts display and management
│   └── portfolio-gallery.tsx        # Public-facing gallery
├── lib/
│   ├── auth.ts                     # Authentication utilities
│   ├── cloudinary.ts               # Cloudinary integration
│   ├── db.ts                       # MongoDB connection
│   └── models.ts                   # MongoDB schema
└── .env.local                      # Environment variables (gitignored)
```

## API Endpoints

### POST /api/admin/posts
**Upload a new post**
- Headers: `x-admin-password` (required)
- Body: FormData with file, barberId, barberName, type, title, caption
- Returns: Created post object

### GET /api/admin/posts
**Fetch all posts (optionally filtered by barber)**
- Query: `barberId` (optional)
- Returns: Array of post objects

### PUT /api/admin/posts/[id]
**Update a post's title or caption**
- Headers: `x-admin-password` (required)
- Body: { title, caption }
- Returns: Updated post object

### DELETE /api/admin/posts/[id]
**Delete a post**
- Headers: `x-admin-password` (required)
- Returns: Success message

## Displaying Posts in Portfolio

To show uploaded posts in a barber's portfolio page, use the `PortfolioGallery` component:

```tsx
import { PortfolioGallery } from '@/components/portfolio-gallery';

export default function PortfolioPage() {
  const barberId = 1; // The barber's ID
  
  return (
    <div>
      <PortfolioGallery barberId={barberId} />
    </div>
  );
}
```

## Security Notes

- **Admin Password**: Change the default password immediately in `.env.local`
- **Environment Variables**: Never commit `.env.local` to version control
- **Cloudinary**: Your API secret should never be exposed to the frontend (it's only used server-side)
- **MongoDB**: Use strong passwords and restrict IP access in MongoDB Atlas

## Troubleshooting

### MongoDB Connection Error
- Verify connection string format in `.env.local`
- Check if MongoDB Atlas cluster is active
- Ensure IP whitelist includes your current IP in MongoDB Atlas

### Cloudinary Upload Fails
- Verify API credentials are correct
- Check file size limits (images: 10MB, videos: 100MB)
- Ensure auth header is being sent with uploads

### Admin Password Not Working
- Double-check `ADMIN_PASSWORD` in `.env.local`
- Ensure `.env.local` is not being overwritten
- Restart the dev server after changing env variables

### Posts Not Showing
- Verify the barber ID is correct
- Check MongoDB connection
- Ensure posts were successfully uploaded (check Cloudinary dashboard)

## Next Steps

1. Update the portfolio pages to use `PortfolioGallery` component
2. Add user authentication for barber-specific access (optional)
3. Implement analytics/usage tracking
4. Add image compression before upload
5. Add batch upload capability

---

For issues or questions, check the API routes and database logs.
