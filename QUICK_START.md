# 🚀 Quick Start Guide - Movie Recommendation System

## ⚡ Get Started in 3 Steps

### Step 1: Download/Clone the Project
Make sure you have all these files:
```
✅ index.html
✅ app.js
✅ dsa.js
✅ fakeApi.js
✅ README.md
✅ TESTING_GUIDE.md
```

### Step 2: Start a Local Server

**Why do I need a server?**  
The project uses ES6 modules (`import/export`), which require a server to avoid CORS errors.

#### 🐍 Option A: Python (Easiest)
```bash
cd "DSA Project"
python -m http.server 8000
```
Then open: **http://localhost:8000**

#### 📦 Option B: Node.js
```bash
cd "DSA Project"
npx http-server
```
Then open: **http://localhost:8080**

#### 💻 Option C: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Click "Open with Live Server"

### Step 3: Explore the App! 🎉

Once the server is running:
1. **Search** for movies by title
2. **Filter** by genre
3. **Watch** movies to build history
4. **Like** movies to update trending
5. **Find related** movies using graph

---

## 📊 Testing Data Structures

### Open Browser Console (F12)

See real-time DSA operations:

```javascript
// View all data structures
movieSystem

// Check watch history (Stack)
movieSystem.watchHistory.getAll()
movieSystem.watchHistory.size()

// View trending heap
movieSystem.trendingHeap.getTopK(5)

// Explore movie graph
movieSystem.movieGraph.getVertexCount()
movieSystem.movieGraph.getEdgeCount()

// Manual operations
movieSystem.watchHistory.push(movieSystem.movies[0])
movieSystem.movieGraph.bfs(1, 2)
```

---

## 🎯 Features to Try

### 1. **Binary Search**
- Type "dark" in search box
- Should find "The Dark Knight"
- Console shows: `🔍 Searching for: "dark"`

### 2. **Stack (LIFO)**
- Watch 3-4 movies
- Check "Watch History" section
- Most recent movie appears first

### 3. **Max Heap**
- Like several movies
- Watch "Trending Now" section update
- Console shows heap rebuild

### 4. **Graph BFS**
- Click any movie
- Click "Show Related" button
- See BFS traversal in console

### 5. **Genre Filter**
- Select "Sci-Fi" from dropdown
- Only Sci-Fi movies shown
- Console logs filter operation

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot use import statement outside a module"
**Solution:** Make sure `<script type="module">` is in index.html, and you're using a local server.

### ❌ Error: "CORS policy blocked"
**Solution:** Don't open `index.html` directly. Use a local server (Python, Node, or Live Server).

### ❌ Movies not loading
**Solution:** Check browser console for errors. Ensure `fakeApi.js` and `dsa.js` are in the same folder.

### ❌ Nothing happens when clicking buttons
**Solution:** Open console (F12) to see error messages. Check that all event listeners are attached.

---

## 📚 Project Files Explained

### **index.html**
- Main HTML structure
- Tailwind CSS for styling
- Links to `app.js` as ES6 module

### **fakeApi.js**
- Mock backend API
- Returns movie data as Promise
- Simulates 500ms network delay
- Easy to replace with real API

### **dsa.js**
- Pure data structure implementations
- Stack, MaxHeap, Graph, BinarySearch
- No dependencies on UI
- Fully reusable

### **app.js**
- Main controller
- Imports from `fakeApi.js` and `dsa.js`
- Handles all UI interactions
- Updates DOM dynamically

---

## 🎓 For Your Presentation

### Key Points to Highlight:

1. **Modular Architecture**
   - Separated concerns (API, DSA, UI)
   - Reusable components
   - Production-ready structure

2. **Data Structures Used**
   - Array: O(1) movie access
   - Stack: LIFO watch history
   - Max Heap: Priority queue for trending
   - Graph: BFS for related movies
   - Binary Search: O(log n) search

3. **Real-World Application**
   - Mimics Netflix/streaming apps
   - Practical use of DSA concepts
   - Scalable architecture

4. **Code Quality**
   - Clean, commented code
   - Complexity analysis included
   - ES6 modern JavaScript
   - Console logs for debugging

---

## 🔥 Advanced Features

### Add Persistence (Optional)
Store data in localStorage:
```javascript
// Save watch history
localStorage.setItem('watchHistory', JSON.stringify(watchHistory.getAll()));

// Load on startup
const savedHistory = JSON.parse(localStorage.getItem('watchHistory'));
```

### Optimize Heap Updates
Instead of rebuilding entire heap:
```javascript
// O(log n) instead of O(n)
heapifyUp(movieIndex);
```

### Add More Graph Algorithms
```javascript
// Dijkstra's for shortest path
// DFS for depth-first related movies
// Detect connected components
```

---

## 📞 Need Help?

1. **Check console (F12)** for error messages
2. **Read TESTING_GUIDE.md** for detailed tests
3. **View README.md** for full documentation

---

**🎉 You're ready to go! Happy coding!**

*Remember: This project demonstrates DSA concepts in a real-world application. Focus on explaining HOW and WHY each data structure is used.*
