# 🎨 Project Architecture Visualization

## 📐 System Architecture Diagram

```
╔═══════════════════════════════════════════════════════════════════╗
║                    USER BROWSER                                   ║
╚═══════════════════════════════════════════════════════════════════╝
                              │
                              │ HTTP Request
                              ▼
╔═══════════════════════════════════════════════════════════════════╗
║                    index.html (View Layer)                        ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │  • Header (Search, Filter, About)                           │ ║
║  │  • Trending Section (Top 5 movies from Max Heap)            │ ║
║  │  • All Movies Section (Grid display from Array)             │ ║
║  │  • Watch History (LIFO from Stack)                          │ ║
║  │  • Related Movies (BFS from Graph)                          │ ║
║  │  • Modals (Movie Details, About)                            │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════════╝
                              │
                              │ <script type="module" src="app.js">
                              ▼
╔═══════════════════════════════════════════════════════════════════╗
║                  app.js (Controller Layer)                        ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │  EVENT HANDLERS:                                            │ ║
║  │  • handleSearch()        → Binary Search                    │ ║
║  │  • handleGenreFilter()   → Array Filter                     │ ║
║  │  • watchMovie()          → Stack Push                       │ ║
║  │  • likeMovie()           → Heap Rebuild                     │ ║
║  │  • showRelatedMovies()   → Graph BFS                        │ ║
║  │                                                              │ ║
║  │  UI UPDATES:                                                │ ║
║  │  • displayMovies()       → Render movie cards               │ ║
║  │  • displayTrending()     → Show top movies                  │ ║
║  │  • updateHistory()       → Show watch stack                 │ ║
║  │  • showMovieDetails()    → Open modal                       │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════════╝
           │                                    │
           │ import { ... }                     │ import { ... }
           ▼                                    ▼
╔═══════════════════════════╗      ╔═══════════════════════════════╗
║   fakeApi.js              ║      ║   dsa.js                      ║
║   (Data Layer)            ║      ║   (Logic Layer)               ║
║  ┌─────────────────────┐  ║      ║  ┌─────────────────────────┐  ║
║  │ API Functions:      │  ║      ║  │ Data Structures:        │  ║
║  │                     │  ║      ║  │                         │  ║
║  │ fetchMovies()       │  ║      ║  │ Stack                   │  ║
║  │   → Promise         │  ║      ║  │  • push() - O(1)        │  ║
║  │   → 20 movies       │  ║      ║  │  • pop() - O(1)         │  ║
║  │   → 500ms delay     │  ║      ║  │  • peek() - O(1)        │  ║
║  │                     │  ║      ║  │  • getAll() - O(n)      │  ║
║  │ fetchGenres()       │  ║      ║  │                         │  ║
║  │   → Unique genres   │  ║      ║  │ MaxHeap                 │  ║
║  │                     │  ║      ║  │  • insert() - O(log n)  │  ║
║  │ searchMovies()      │  ║      ║  │  • extractMax() - O(log)│  ║
║  │   → Filtered list   │  ║      ║  │  • bubbleUp() - O(log n)│  ║
║  │                     │  ║      ║  │  • bubbleDown() - O(log)│  ║
║  │ filterByGenre()     │  ║      ║  │  • rebuild() - O(n)     │  ║
║  │   → Genre matches   │  ║      ║  │  • getTopK() - O(k)     │  ║
║  └─────────────────────┘  ║      ║  │                         │  ║
╚═══════════════════════════╝      ║  │ MovieGraph              │  ║
                                   ║  │  • addMovie() - O(1)    │  ║
                                   ║  │  • addRelation() - O(1) │  ║
                                   ║  │  • bfs() - O(V + E)     │  ║
                                   ║  │  • dfs() - O(V + E)     │  ║
                                   ║  │  • getNeighbors() - O(1)│  ║
                                   ║  │                         │  ║
                                   ║  │ BinarySearch            │  ║
                                   ║  │  • searchByTitle() - O(log n) │
                                   ║  │  • searchByRating() - O(log n)│
                                   ║  └─────────────────────────┘  ║
                                   ╚═══════════════════════════════╝
```

---

## 🔄 Data Flow Example: "Watch a Movie"

```
1. User clicks "Watch Now" button
   │
   ▼
2. app.js: watchMovie() function triggered
   │
   ├─→ Find movie from movies array - O(n)
   │
   ├─→ Increment movie.views++
   │
   ├─→ Call: watchHistory.push(movie) - O(1)
   │   │
   │   └─→ dsa.js: Stack.push()
   │       │
   │       └─→ items.push(movie)
   │           Stack: [movie1, movie2, movie3, NEW_MOVIE] ← Top
   │
   ├─→ Call: updateHistory()
   │   │
   │   └─→ Get history with watchHistory.getAll()
   │       │
   │       └─→ dsa.js: Stack.getAll()
   │           Returns: [NEW_MOVIE, movie3, movie2, movie1]
   │                     ↑ Most recent first (LIFO)
   │
   ├─→ Update DOM with new history
   │
   └─→ Show success notification
```

---

## 🔄 Data Flow Example: "Like a Movie"

```
1. User clicks "Like" button
   │
   ▼
2. app.js: likeMovie() function triggered
   │
   ├─→ Find movie from movies array - O(n)
   │
   ├─→ Increment movie.likes++
   │
   ├─→ Call: trendingHeap.rebuild(movies) - O(n)
   │   │
   │   └─→ dsa.js: MaxHeap.rebuild()
   │       │
   │       ├─→ Copy all movies to heap array
   │       │
   │       └─→ Heapify from bottom up
   │           │
   │           └─→ For each parent node: bubbleDown()
   │               Ensures: parent.likes ≥ children.likes
   │
   ├─→ Call: displayTrending()
   │   │
   │   └─→ Get top 5: trendingHeap.getTopK(5)
   │       │
   │       └─→ dsa.js: MaxHeap.getTopK()
   │           Sort by likes, return top 5
   │
   ├─→ Update Trending section in DOM
   │
   └─→ Show success notification
```

---

## 🔄 Data Flow Example: "Search for Movie"

```
1. User types in search box
   │
   ▼
2. app.js: handleSearch() function triggered
   │
   ├─→ Get query from input field
   │
   ├─→ Call: BinarySearch.searchByTitle(movies, query)
   │   │
   │   └─→ dsa.js: BinarySearch.searchByTitle()
   │       │
   │       ├─→ Sort movies alphabetically - O(n log n)
   │       │
   │       ├─→ Binary search for match - O(log n)
   │       │   │
   │       │   ├─→ Find middle element
   │       │   │
   │       │   ├─→ Compare with query
   │       │   │
   │       │   ├─→ If match: expand left and right
   │       │   │
   │       │   └─→ If no match: adjust search bounds
   │       │
   │       └─→ Return matching movies
   │
   ├─→ Call: displayMovies(results)
   │
   └─→ Update movie grid in DOM
```

---

## 🔄 Data Flow Example: "Find Related Movies"

```
1. User clicks "Show Related" button
   │
   ▼
2. app.js: showRelatedMovies() function triggered
   │
   ├─→ Get current movieId
   │
   ├─→ Call: movieGraph.bfs(movieId, 2) - O(V + E)
   │   │
   │   └─→ dsa.js: Graph.bfs()
   │       │
   │       ├─→ Initialize queue: [[movieId, depth=0]]
   │       │
   │       ├─→ Initialize visited set
   │       │
   │       └─→ While queue not empty:
   │           │
   │           ├─→ Dequeue [currentId, depth]
   │           │
   │           ├─→ If depth > 0: add to related[]
   │           │
   │           └─→ If depth < maxDepth:
   │               │
   │               └─→ Get neighbors from adjacency list
   │                   │
   │                   └─→ For each unvisited neighbor:
   │                       │
   │                       ├─→ Mark as visited
   │                       │
   │                       └─→ Enqueue [neighborId, depth+1]
   │
   ├─→ Map IDs to movie objects
   │
   ├─→ Call: displayMovies(relatedMovies)
   │
   └─→ Scroll to Related section
```

---

## 📊 Memory Layout

```
HEAP (Dynamic Memory):
┌──────────────────────────────────────┐
│  movies[] - Array                    │  20 objects × ~150 bytes = ~3 KB
│  [movie1, movie2, ..., movie20]      │
├──────────────────────────────────────┤
│  watchHistory - Stack                │  Variable size (grows with watches)
│  items: [movie3, movie7, movie1]     │  Each reference: 8 bytes
├──────────────────────────────────────┤
│  trendingHeap - MaxHeap              │  20 movie references = 160 bytes
│  heap: [movie5, movie3, movie1, ...] │  (references, not copies)
├──────────────────────────────────────┤
│  movieGraph - Graph                  │  Map structure:
│  adjacencyList:                      │  20 keys × avg 10 edges = ~400 bytes
│    1 → [2, 3, 6, 12, ...]           │
│    2 → [1, 13, 19, 20, ...]         │
│    ...                               │
└──────────────────────────────────────┘

Total Memory: ~5-10 KB (very efficient!)
```

---

## 🎯 Algorithm Complexity Summary

| Operation | Data Structure | Time | Space |
|-----------|---------------|------|-------|
| Load movies | Array | O(n) | O(n) |
| Access movie | Array | O(1) | O(1) |
| Search by title | Binary Search | O(log n) | O(n) |
| Filter by genre | Array Filter | O(n) | O(k) |
| Watch movie | Stack Push | O(1) | O(1) |
| View history | Stack GetAll | O(n) | O(n) |
| Like movie | Heap Rebuild | O(n) | O(1) |
| Get trending | Heap GetTopK | O(k log k) | O(k) |
| Find related | Graph BFS | O(V + E) | O(V) |
| Build graph | Graph Init | O(V²) | O(V + E) |

---

## 🔧 Module Dependencies

```
index.html
    │
    └──imports──→ app.js (type="module")
                    │
                    ├──imports──→ fakeApi.js
                    │               └─exports─→ fetchMovies()
                    │                           fetchGenres()
                    │                           searchMovies()
                    │                           filterByGenre()
                    │
                    └──imports──→ dsa.js
                                    └─exports─→ Stack
                                                MaxHeap
                                                MovieGraph
                                                BinarySearch
```

---

## 📱 Responsive Design Flow

```
Desktop (> 1024px):
┌────────────────────────────────────────────┐
│              Header (Search + Filter)       │
├────────────────────────────────────────────┤
│  Trending: [Card] [Card] [Card] [Card] [Card] │
├────────────────────────────────────────────┤
│  All Movies:                                │
│  [Card] [Card] [Card] [Card] [Card]        │
│  [Card] [Card] [Card] [Card] [Card]        │
│  [Card] [Card] [Card] [Card] [Card]        │
│  [Card] [Card] [Card] [Card] [Card]        │
├────────────────────────────────────────────┤
│  History: [→→→→ Horizontal Scroll →→→→]    │
└────────────────────────────────────────────┘

Tablet (768px - 1024px):
┌────────────────────────────┐
│  Header (Search + Filter)  │
├────────────────────────────┤
│  Trending:                 │
│  [Card] [Card] [Card]      │
├────────────────────────────┤
│  All Movies:               │
│  [Card] [Card] [Card]      │
│  [Card] [Card] [Card]      │
├────────────────────────────┤
│  History: [→→ Scroll →→]   │
└────────────────────────────┘

Mobile (< 768px):
┌──────────────┐
│  Header      │
├──────────────┤
│  Search      │
│  [________]  │
│  Filter      │
│  [▼ Genre]   │
├──────────────┤
│  Trending:   │
│  [Card]      │
│  [Card]      │
├──────────────┤
│  Movies:     │
│  [Card]      │
│  [Card]      │
│  [Card]      │
├──────────────┤
│  History:    │
│  [→ Scroll→] │
└──────────────┘
```

---

**This architecture ensures:**
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Easy to test
- ✅ Easy to maintain
- ✅ Scalable design
- ✅ Production-ready structure
