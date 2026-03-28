# Admin Panel Quick Start Checklist

## 🚀 Getting Started (5 minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Create MongoDB Database
- [ ] Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create a free cluster
- [ ] Get connection string (Connection → Drivers)
- [ ] Save for next step

### 3. Get Cloudinary Account
- [ ] Go to [Cloudinary](https://cloudinary.com)
- [ ] Sign up (free tier available)
- [ ] Go to Dashboard
- [ ] Copy: Cloud Name, API Key, API Secret

### 4. Create `.env.local` File
Copy this into `frontend/.env.local`:
```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
ADMIN_PASSWORD=YourSecurePasswordHere_Change123!
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Start Application
```bash
npm run dev
```

### 6. Access Admin Panel
- Navigate to: `http://localhost:3000/admin`
- Enter your admin password
- Start uploading!

---

## 📋 Admin Panel How-To

### Upload a Post
1. Click "Upload New Post"
2. Select barber name
3. Choose image or video
4. Upload file (drag & drop or click)
5. Add title (required)
6. Add caption (optional)
7. Click "Upload Post"

### Edit a Post
1. Find post in the gallery
2. Click "Edit" button
3. Change title or caption
4. Click "Save"

### Delete a Post
1. Find post in gallery
2. Click "Delete" button
3. Confirm deletion

---

## 🎨 Adding Posts to Portfolio Pages

In a barber's portfolio page (`frontend/app/portfolio/[id]/page.tsx`), add:

```tsx
import { PortfolioGallery } from '@/components/portfolio-gallery';

// Inside your component:
<PortfolioGallery barberId={barberId} />
```

---

## ⚠️ Important Security Notes

1. **Change Admin Password** - Don't leave as default
2. **Never commit `.env.local`** - It's already in `.gitignore`
3. **Keep API Keys Secret** - Never share them
4. **Strong MongoDB Password** - Required for Atlas

---

## 🔗 File Locations

| Purpose | Path |
|---------|------|
| Admin Login | `/admin` |
| Upload API | `/api/admin/posts` |
| Delete API | `/api/admin/posts/[id]` |
| Setup Guide | `/ADMIN_PANEL_SETUP.md` |

---

## ❓ Troubleshooting

**Posts not uploading?**
- Check Cloudinary credentials
- Verify MongoDB connection
- Check browser console for errors

**Can't log in?**
- Verify `ADMIN_PASSWORD` in `.env.local`
- Restart dev server (Ctrl+C, then `npm run dev`)

**Posts not showing?**
- Ensure PortfolioGallery component is added to portfolio page
- Check correct barber ID is being passed

---

## 📚 Full Documentation

For detailed setup instructions, see: `ADMIN_PANEL_SETUP.md`

---

## 🎯 Next Steps

1. ✅ Complete setup checklist above
2. ✅ Test by uploading a sample image
3. ✅ Add PortfolioGallery to portfolio pages
4. ✅ Share admin password with team (securely!)
5. ✅ Start managing content

Happy content management! 🎉
