# 🎬 Movie Recommendation System - DSA Project

## 📌 Project Overview

A **Movie Recommendation System** built with HTML, CSS (Tailwind), and JavaScript that demonstrates practical implementation of core **Data Structures and Algorithms** taught in CSC-222 course.

This project features a **modular architecture** with separate files for API, DSA logic, and UI controller, mimicking real-world production applications.

---

## 🏗️ Project Structure

```
📂 DSA Project/
│
├── index.html          # Frontend UI with Tailwind CSS
├── app.js             # Main controller (connects UI with API & DSA)
├── dsa.js             # Pure DSA implementations (Stack, Heap, Graph)
├── fakeApi.js         # Mock API for movie data
├── README.md          # Project documentation
└── TESTING_GUIDE.md   # Testing instructions
```

### **Modular Architecture**

#### 1. **fakeApi.js** - Mock Backend
- Simulates REST API with network delay
- Provides movie data with `fetchMovies()`
- Returns `Promise` objects (async/await)
- Easy to replace with real API later

#### 2. **dsa.js** - Pure DSA Logic
- Independent data structure implementations
- No UI dependencies
- Fully reusable and testable
- Includes complexity analysis

#### 3. **app.js** - UI Controller
- Connects UI with API and DSA modules
- Handles user interactions
- Updates DOM dynamically
- ES6 modules with `import/export`

---

## 🎯 Learning Objectives

- ✅ Demonstrate understanding of linear & non-linear data structures
- ✅ Implement real-world operations using DSA logic
- ✅ Analyze time/space complexity of algorithms
- ✅ Create an interactive, educational web application

---

## 🧩 Features & Data Structures

### 1. **Movie Storage - Array**
- **Purpose**: Store and display all movies efficiently
- **Complexity**: O(1) access time
- **Implementation**: JavaScript array storing Movie objects
- **Use Case**: Quick retrieval of movie data by index

### 2. **Watch History - Stack (LIFO)**
- **Purpose**: Track recently watched movies
- **Complexity**: O(1) push/pop operations
- **Implementation**: Custom Stack class with array backing
- **Use Case**: Display watch history with most recent on top
- **Operations**:
  - `push()` - Add movie to history
  - `pop()` - Remove last watched
  - `peek()` - View last watched without removing
  - `getAll()` - Display all history (reversed)

### 3. **Trending Movies - Max Heap (Priority Queue)**
- **Purpose**: Maintain most liked movies dynamically
- **Complexity**: O(log n) insertion/extraction
- **Implementation**: Binary Max Heap based on likes
- **Use Case**: Always show top trending movies
- **Operations**:
  - `insert()` - Add movie to heap
  - `extractMax()` - Get most liked movie
  - `bubbleUp()` - Maintain heap property on insertion
  - `bubbleDown()` - Maintain heap property on extraction
  - `rebuild()` - Rebuild entire heap when likes change

### 4. **Movie Relationships - Graph (Adjacency List)**
- **Purpose**: Find related movies based on genre, rating, or year
- **Complexity**: O(V + E) for BFS/DFS traversal
- **Implementation**: Graph with adjacency list using Map
- **Use Case**: Recommend similar movies to users
- **Operations**:
  - `addVertex()` - Add movie to graph
  - `addEdge()` - Create relationship between movies
  - `bfs()` - Breadth-First Search for related movies
  - `dfs()` - Depth-First Search (alternative)

### 5. **Movie Search - Binary Search**
- **Purpose**: Efficiently search movies by title
- **Complexity**: O(log n) on sorted array
- **Implementation**: Binary search on sorted movie array
- **Use Case**: Quick movie lookup by title
- **Operations**:
  - Sort movies alphabetically
  - Binary search for exact/partial matches
  - Return all matching results

### 6. **Genre Filter - Linear Traversal**
- **Purpose**: Filter movies by genre
- **Complexity**: O(n) time
- **Implementation**: Array filter method
- **Use Case**: Display movies of specific genre

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│              Movie Recommendation System            │
└─────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
    │  Array  │    │  Stack  │    │MaxHeap  │
    │ Storage │    │ History │    │Trending │
    └─────────┘    └─────────┘    └─────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
         ┌────▼────┐          ┌────▼────┐
         │  Graph  │          │ Binary  │
         │Relations│          │ Search  │
         └─────────┘          └─────────┘
```

---

## 🔧 Implementation Details

### Movie Class
```javascript
class Movie {
    constructor(id, title, genre, rating, year, description) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.rating = rating;
        this.year = year;
        this.description = description;
        this.likes = 0;
        this.views = 0;
    }
}
```

### Stack Implementation (Watch History)
```javascript
class Stack {
    push(element)    // O(1) - Add to history
    pop()           // O(1) - Remove last watched
    peek()          // O(1) - View top element
    isEmpty()       // O(1) - Check if empty
    size()          // O(1) - Get stack size
    getAll()        // O(n) - Get all items
}
```

### Max Heap Implementation (Trending)
```javascript
class MaxHeap {
    insert(movie)       // O(log n) - Add movie
    extractMax()        // O(log n) - Get top movie
    bubbleUp(index)     // O(log n) - Heapify up
    bubbleDown(index)   // O(log n) - Heapify down
    rebuild(movies)     // O(n) - Build heap
    getTopK(k)          // O(k) - Get top K movies
}
```

### Graph Implementation (Relationships)
```javascript
class Graph {
    addVertex(movieId)           // O(1) - Add movie
    addEdge(id1, id2)           // O(1) - Create relation
    bfs(startId, maxDepth)      // O(V + E) - Find related
    dfs(startId, maxDepth)      // O(V + E) - Alternative
    getNeighbors(movieId)       // O(1) - Get connections
}
```

---

## ⚡ Complexity Analysis

| Operation | Data Structure | Time Complexity | Space Complexity |
|-----------|---------------|-----------------|------------------|
| Add Movie | Array | O(1) | O(n) |
| Search Movie | Binary Search | O(log n) | O(1) |
| Filter Genre | Linear Search | O(n) | O(k) |
| Add to History | Stack | O(1) | O(n) |
| View History | Stack | O(n) | O(n) |
| Like Movie | Max Heap | O(log n) | O(n) |
| Get Trending | Max Heap | O(k) | O(1) |
| Find Related | Graph BFS | O(V + E) | O(V) |
| Build Graph | Graph | O(V²) | O(V + E) |

Where:
- `n` = number of movies
- `k` = number of results
- `V` = vertices (movies)
- `E` = edges (relationships)

---

## 🚀 How to Run

### **Option 1: Local Development Server (Recommended)**

Since we're using ES6 modules, you need to run a local server:

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

#### Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then open: http://localhost:8080
```

#### Using VS Code Live Server Extension:
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### **Option 2: Direct Browser (with CORS disabled)**

If you open `index.html` directly in browser, you'll get CORS errors due to ES6 modules. Use a local server instead (Option 1).

---

## 💡 Usage Guide

### 1. **Browse Movies**
- View all movies in the "All Movies" section
- Click on any movie to see details

### 2. **Search Movies**
- Type movie title in search box
- Uses binary search for efficient lookup

### 3. **Filter by Genre**
- Select genre from dropdown
- See movies filtered by selected genre

### 4. **Watch Movies**
- Click on a movie
- Click "Watch Now" button
- Movie added to watch history (Stack)

### 5. **Like Movies**
- Click on a movie
- Click "Like" button
- Trending list updates automatically (Max Heap)

### 6. **Find Related Movies**
- Click on a movie
- Click "Show Related" button
- See similar movies using graph traversal (BFS)

### 7. **View Trending**
- Check "Trending Now" section
- Shows top 5 most liked movies
- Updates dynamically using priority queue

### 8. **View History**
- Check "Watch History" section
- Most recent movie appears first (LIFO)

---

## 🎓 Course Information

- **Course**: CSC-222 Data Structures
- **Semester**: 3rd Semester
- **Technologies**: HTML, CSS (Tailwind CSS), JavaScript
- **Focus**: Practical DSA implementation

---

## 📚 Reference Materials

### Books
- **Goodrich, Tamassia, Goldwasser**: *Data Structures and Algorithms in Java*
- **Cormen, Leiserson, Rivest, Stein**: *Introduction to Algorithms (CLRS)*

### Topics Covered
- Arrays and Lists
- Stacks and Queues
- Binary Heaps / Priority Queues
- Graphs and Graph Traversal (BFS/DFS)
- Binary Search
- Time/Space Complexity Analysis

---

## 🌟 Key Highlights

✨ **Clean Code**: Well-commented, organized, and readable  
✨ **Modular Design**: Separate classes for each data structure  
✨ **Responsive UI**: Works on desktop, tablet, and mobile  
✨ **Modern Design**: Using Tailwind CSS for professional look  
✨ **Educational**: Console logs show DSA operations  
✨ **Interactive**: Real-time updates and smooth animations  

---

## 🔍 Advanced Features

### Debugging & Learning
- Open browser console (F12) to see:
  - Data structure initialization logs
  - Operation complexity notes
  - Real-time updates

### Code Comments
- Every data structure has detailed comments
- Big-O notation included for all operations
- Clear explanation of algorithms

---

## 📊 Sample Data

The system includes 20 pre-loaded movies across various genres:
- **Drama**: Shawshank Redemption, Forrest Gump, The Green Mile
- **Action**: Dark Knight, Gladiator, The Avengers
- **Sci-Fi**: Inception, Interstellar, The Matrix
- **Crime**: Pulp Fiction, Goodfellas, The Godfather
- **Thriller**: Silence of the Lambs
- **And more...**

---

## 🎯 Learning Outcomes Achieved

✅ **Implemented** 5 major data structures from scratch  
✅ **Demonstrated** real-world use cases for each structure  
✅ **Analyzed** time and space complexity  
✅ **Created** interactive UI to visualize data structures  
✅ **Applied** algorithms (BFS, Binary Search, Heapify)  
✅ **Built** complete working application  

---

## 🛠️ Future Enhancements

- Add user authentication
- Persist data using LocalStorage
- Implement more sorting algorithms
- Add movie ratings and reviews
- Create recommendation algorithm using ML
- Add more graph algorithms (Dijkstra's for shortest path)
- Implement hash tables for O(1) movie lookup

---

## 📝 Notes

This project is created for **educational purposes** to demonstrate Data Structures and Algorithms concepts. The movie data is fictional and used only for demonstration.

---

## 👨‍💻 Author

**CSC-222 Data Structures Student**  
3rd Semester Project

---

## 📄 License

This project is created for academic purposes.

---

**Happy Learning! 🚀**

*Remember: Understanding data structures is key to becoming a great programmer!*
