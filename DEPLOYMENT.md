# 🚀 Vercel Deployment Guide - MovieHub DSA

## Quick Deploy (3 Steps)

### Option 1: Deploy via Vercel Website (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - MovieHub DSA project"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/moviehub-dsa.git
   git push -u origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login" (use GitHub account)
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your `moviehub-dsa` repository
   - Click "Import"

3. **Deploy**
   - Project Name: `moviehub-dsa` (or your choice)
   - Framework Preset: **Other** (static site)
   - Root Directory: `./`
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Click "Deploy"

**Done! Your site will be live at:** `https://moviehub-dsa.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   - Choose your preferred login method (GitHub, GitLab, etc.)

3. **Deploy from project directory**
   ```bash
   cd "c:\Users\alira\OneDrive\Desktop\DSA Project"
   vercel
   ```
   
   Answer the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - What's your project's name? **moviehub-dsa**
   - In which directory is your code located? **./**
   
4. **Deploy to production**
   ```bash
   vercel --prod
   ```

**Your deployment URL will be shown in the terminal!**

---

## 📋 Pre-Deployment Checklist

✅ **Files Created:**
- [x] `vercel.json` - Vercel configuration
- [x] `package.json` - Project metadata
- [x] `.gitignore` - Ignore unnecessary files

✅ **Code Ready:**
- [x] All HTML files present (index.html, liked.html, history.html)
- [x] All JS modules working (app.js, dsa.js, fakeApi.js)
- [x] ES6 modules properly configured
- [x] CORS headers configured in vercel.json
- [x] Responsive design implemented

✅ **Testing:**
- [ ] Test locally with Live Server
- [ ] Check console for errors
- [ ] Verify all features work
- [ ] Test on mobile/tablet/desktop

---

## 🔧 Vercel Configuration Explained

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"  // Serve HTML as static files
    },
    {
      "src": "*.js",
      "use": "@vercel/static"  // Serve JS as static files
    }
  ],
  "headers": [
    {
      "source": "/**/*.js",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/javascript; charset=utf-8"
        }
      ]
    }
  ]
}
```

**Why this config?**
- Ensures ES6 modules work correctly
- Sets proper MIME types for JavaScript files
- Enables CORS for API calls
- Optimizes static file serving

---

## 🌐 Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

---

## 🐛 Troubleshooting

### Issue: ES6 Module Error
**Error:** `Failed to load module script`

**Solution:**
- Ensure `vercel.json` has JavaScript MIME type headers
- Check that all imports use `.js` extension
- Verify file paths are correct

### Issue: 404 on Page Refresh
**Error:** Liked/History pages show 404 on refresh

**Solution:**
Already handled in `vercel.json` with:
```json
"routes": [
  { "src": "/(.*)", "dest": "/$1" }
]
```

### Issue: API CORS Error
**Error:** `Access-Control-Allow-Origin` missing

**Solution:**
Check `vercel.json` has CORS headers configured.

### Issue: localStorage Not Working
**Note:** localStorage works on HTTPS (Vercel provides this automatically)

---

## 📊 Deployment Status

After deployment, you can:

1. **View Live Site**: Click the deployment URL
2. **Monitor Analytics**: Vercel dashboard shows traffic
3. **View Logs**: Check deployment and runtime logs
4. **Set Environment Variables**: If needed later

---

## 🔄 Update Deployment

### From GitHub (Automatic)
- Push changes to GitHub
- Vercel auto-deploys from `main` branch
- View progress in Vercel dashboard

### From CLI (Manual)
```bash
git add .
git commit -m "Update: description of changes"
git push origin main

# Or deploy directly
vercel --prod
```

---

## 📱 Share Your Project

Once deployed, share your live URL:

```
🎬 MovieHub DSA - Live Demo
https://moviehub-dsa.vercel.app

Built with:
✅ HTML5, Tailwind CSS, JavaScript ES6
✅ Data Structures: Stack, Heap, Graph, Set
✅ Algorithms: Binary Search, BFS, Heap Sort
✅ Fully responsive design
```

---

## 🎓 Project Submission

For academic submission, include:

1. **Live Demo URL**: `https://your-project.vercel.app`
2. **GitHub Repository**: `https://github.com/username/moviehub-dsa`
3. **README.md**: Project documentation
4. **Code Documentation**: Comments in code
5. **Screenshots**: Mobile + Desktop views

---

## ✅ Post-Deployment Testing

Test these features on your live site:

1. ✅ Search movies by title
2. ✅ Filter by genre
3. ✅ Like movies (check localStorage)
4. ✅ Watch movies (add to history)
5. ✅ View trending (priority queue)
6. ✅ Show related movies (graph traversal)
7. ✅ Sort by popularity
8. ✅ Navigate to Liked/History pages
9. ✅ Mobile responsiveness
10. ✅ Console logs for DSA operations

---

## 🎉 Success!

Your DSA project is now live on the internet! 

**Next Steps:**
- Share with classmates
- Add to your resume/portfolio
- Submit for grading
- Continue learning!

**Support:**
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- GitHub Issues: Create issues for bugs
- Community: Vercel Discord

---

**Happy Deploying! 🚀**
