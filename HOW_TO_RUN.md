# 🎯 How to Run Your Project

## ⚡ Two Ways to Run

### Option 1: Use Live Server (Recommended - Easiest!)

**For VS Code Users:**

1. Install "Live Server" extension in VS Code
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Click Install

2. Right-click on `index.html`

3. Select "Open with Live Server"

4. Your browser will open automatically! 🎉

---

### Option 2: Run with Node.js http-server

**If you have Node.js installed:**

1. Open PowerShell in your project folder

2. Run this command:
```powershell
npx -y http-server -p 8000
```

3. Open browser and go to: **http://localhost:8000**

---

## ❓ Why Can't I Just Double-Click index.html?

The project uses **ES6 modules** (`import/export`), which browsers block when opening files directly due to security (CORS policy).

**You MUST use a local server** (Live Server or http-server).

---

## ✅ Quick Test

Once the app is running:

1. You should see 20 movies loaded
2. Try searching for "dark"
3. Click on a movie
4. Click "Watch Now"
5. Check "Watch History" section
6. Press F12 to open console and see DSA logs!

---

## 🎓 For Your Presentation

### Show These Features:

1. **Search** (Binary Search) - Type "inception"
2. **Filter** (Array) - Select "Sci-Fi" genre
3. **Like** (Max Heap) - Like multiple movies, watch trending update
4. **Watch** (Stack) - Watch movies, see LIFO history
5. **Related** (Graph BFS) - Click "Show Related" on any movie

### Open Console (F12) During Demo:

You'll see logs like:
```
🎬 Initializing Movie Recommendation System...
📊 Loaded 20 movies from API
🔥 Trending heap initialized
🌐 Movie graph initialized
✅ Application ready!
```

---

## 🚨 Troubleshooting

### "Cannot use import statement outside a module"
**Fix:** Use Live Server or http-server (see options above)

### Movies not loading
**Fix:** Check browser console (F12) for errors

### Buttons not working
**Fix:** Make sure all .js files are in the same folder as index.html

---

## 📂 Required Files Checklist

Make sure you have all these files:

```
✅ index.html       (Main HTML)
✅ app.js          (UI Controller)
✅ dsa.js          (Data Structures)
✅ fakeApi.js      (Mock API)
✅ README.md       (Documentation)
✅ TESTING_GUIDE.md
✅ QUICK_START.md
✅ HOW_TO_RUN.md (this file)
```

---

**🎉 You're all set! Run the project and explore DSA in action!**
