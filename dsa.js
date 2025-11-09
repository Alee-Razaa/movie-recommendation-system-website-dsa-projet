// ============================================
// DATA STRUCTURES IMPLEMENTATIONS
// ============================================
// Pure DSA logic - independent of UI
// Each structure includes complexity analysis

/**
 * STACK IMPLEMENTATION
 * Used for: Watch History (LIFO - Last In, First Out)
 * Space Complexity: O(n) where n is number of elements
 */
export class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * Push element to top of stack
   * Time Complexity: O(1)
   */
  push(element) {
    this.items.push(element);
  }

  /**
   * Remove and return top element
   * Time Complexity: O(1)
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  /**
   * View top element without removing
   * Time Complexity: O(1)
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Check if stack is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get size of stack
   * Time Complexity: O(1)
   */
  size() {
    return this.items.length;
  }

  /**
   * Get all items (most recent first)
   * Time Complexity: O(n)
   */
  getAll() {
    return [...this.items].reverse();
  }

  /**
   * Clear all items from stack
   * Time Complexity: O(1)
   */
  clear() {
    this.items = [];
  }

  /**
   * Check if element exists in stack
   * Time Complexity: O(n)
   */
  contains(element) {
    return this.items.includes(element);
  }
}

/**
 * MAX HEAP IMPLEMENTATION
 * Used for: Trending Movies (Priority Queue based on likes)
 * Space Complexity: O(n) where n is number of movies
 */
export class MaxHeap {
  constructor() {
    this.heap = [];
  }

  /**
   * Insert element and maintain heap property
   * Time Complexity: O(log n)
   */
  insert(movie) {
    this.heap.push(movie);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Bubble up element to maintain max heap property
   * Time Complexity: O(log n)
   */
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      
      // Compare based on likes (priority)
      if (this.heap[index].likes <= this.heap[parentIndex].likes) {
        break;
      }
      
      // Swap with parent
      [this.heap[index], this.heap[parentIndex]] = 
        [this.heap[parentIndex], this.heap[index]];
      
      index = parentIndex;
    }
  }

  /**
   * Extract maximum element (most liked movie)
   * Time Complexity: O(log n)
   */
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return max;
  }

  /**
   * Bubble down element to maintain max heap property
   * Time Complexity: O(log n)
   */
  bubbleDown(index) {
    while (true) {
      let largest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < this.heap.length && 
          this.heap[leftChild].likes > this.heap[largest].likes) {
        largest = leftChild;
      }
      
      if (rightChild < this.heap.length && 
          this.heap[rightChild].likes > this.heap[largest].likes) {
        largest = rightChild;
      }
      
      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = 
        [this.heap[largest], this.heap[index]];
      
      index = largest;
    }
  }

  /**
   * Rebuild entire heap from array
   * Time Complexity: O(n) - Build heap algorithm
   */
  rebuild(movies) {
    this.heap = [...movies];
    // Start from last parent node and heapify down
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.bubbleDown(i);
    }
  }

  /**
   * Get top K elements without removing them
   * Time Complexity: O(n log n) due to sorting
   * Note: Could be optimized to O(k log n) with partial heap sort
   */
  getTopK(k) {
    return [...this.heap]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, Math.min(k, this.heap.length));
  }

  /**
   * Peek at maximum element without removing
   * Time Complexity: O(1)
   */
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  /**
   * Get size of heap
   * Time Complexity: O(1)
   */
  size() {
    return this.heap.length;
  }

  /**
   * Check if heap is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.heap.length === 0;
  }
}

/**
 * GRAPH IMPLEMENTATION
 * Used for: Movie Relationships (Adjacency List)
 * Space Complexity: O(V + E) where V is vertices, E is edges
 */
export class MovieGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * Add vertex (movie) to graph
   * Time Complexity: O(1)
   */
  addMovie(id) {
    if (!this.adjacencyList.has(id)) {
      this.adjacencyList.set(id, []);
    }
  }

  /**
   * Add edge between two movies (bidirectional)
   * Time Complexity: O(1)
   */
  addRelation(id1, id2) {
    this.addMovie(id1);
    this.addMovie(id2);
    
    // Add bidirectional edge
    if (!this.adjacencyList.get(id1).includes(id2)) {
      this.adjacencyList.get(id1).push(id2);
    }
    if (!this.adjacencyList.get(id2).includes(id1)) {
      this.adjacencyList.get(id2).push(id1);
    }
  }

  /**
   * Get directly related movies
   * Time Complexity: O(1)
   */
  getRelatedMovies(id) {
    return this.adjacencyList.get(id) || [];
  }

  /**
   * Breadth-First Search (BFS) Traversal
   * Find related movies up to a certain depth
   * Time Complexity: O(V + E) where V is vertices, E is edges
   * Space Complexity: O(V) for queue and visited set
   */
  bfs(startId, maxDepth = 2) {
    const visited = new Set();
    const queue = [[startId, 0]]; // [movieId, depth]
    const related = [];

    visited.add(startId);

    while (queue.length > 0) {
      const [currentId, depth] = queue.shift();

      // Add to related if not the starting movie
      if (depth > 0 && depth <= maxDepth) {
        related.push(currentId);
      }

      // Continue exploring if not at max depth
      if (depth < maxDepth) {
        const neighbors = this.adjacencyList.get(currentId) || [];
        for (const neighborId of neighbors) {
          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            queue.push([neighborId, depth + 1]);
          }
        }
      }
    }

    return related;
  }

  /**
   * Depth-First Search (DFS) Traversal
   * Alternative approach to find related movies
   * Time Complexity: O(V + E)
   * Space Complexity: O(V) for recursion stack
   */
  dfs(startId, maxDepth = 2) {
    const visited = new Set();
    const related = [];

    const dfsHelper = (movieId, depth) => {
      if (depth > maxDepth) return;
      
      visited.add(movieId);
      
      if (depth > 0) {
        related.push(movieId);
      }

      const neighbors = this.adjacencyList.get(movieId) || [];
      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          dfsHelper(neighborId, depth + 1);
        }
      }
    };

    dfsHelper(startId, 0);
    return related;
  }

  /**
   * Get all neighbors of a movie
   * Time Complexity: O(1)
   */
  getNeighbors(id) {
    return this.adjacencyList.get(id) || [];
  }

  /**
   * Check if two movies are connected
   * Time Complexity: O(1)
   */
  areConnected(id1, id2) {
    const neighbors = this.adjacencyList.get(id1) || [];
    return neighbors.includes(id2);
  }

  /**
   * Get number of connections for a movie
   * Time Complexity: O(1)
   */
  getDegree(id) {
    return (this.adjacencyList.get(id) || []).length;
  }

  /**
   * Get total number of vertices
   * Time Complexity: O(1)
   */
  getVertexCount() {
    return this.adjacencyList.size;
  }

  /**
   * Get total number of edges
   * Time Complexity: O(V) where V is number of vertices
   */
  getEdgeCount() {
    let count = 0;
    for (const neighbors of this.adjacencyList.values()) {
      count += neighbors.length;
    }
    // Divide by 2 because edges are bidirectional
    return count / 2;
  }
}

/**
 * BINARY SEARCH IMPLEMENTATION
 * Used for: Efficient movie title search
 * Time Complexity: O(log n) on sorted array
 */
export class BinarySearch {
  /**
   * Search for movies by title
   * @param {Array} movies - Sorted array of movies
   * @param {string} query - Search query
   * @returns {Array} Matching movies
   * Time Complexity: O(log n) for binary search + O(k) for collecting results
   */
  static searchByTitle(movies, query) {
    // First, sort movies by title
    const sortedMovies = [...movies].sort((a, b) => 
      a.title.localeCompare(b.title)
    );
    
    const searchTerm = query.toLowerCase();
    let left = 0;
    let right = sortedMovies.length - 1;

    // Binary search for first match
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midTitle = sortedMovies[mid].title.toLowerCase();

      if (midTitle.includes(searchTerm)) {
        // Found a match, collect all matches around it
        const results = [];
        
        // Search left
        let i = mid;
        while (i >= 0 && sortedMovies[i].title.toLowerCase().includes(searchTerm)) {
          results.unshift(sortedMovies[i]);
          i--;
        }
        
        // Search right
        i = mid + 1;
        while (i < sortedMovies.length && 
               sortedMovies[i].title.toLowerCase().includes(searchTerm)) {
          results.push(sortedMovies[i]);
          i++;
        }
        
        return results;
      } else if (midTitle < searchTerm) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // Fallback to linear search for partial matches
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Binary search by rating
   * Time Complexity: O(log n)
   */
  static searchByRating(movies, targetRating) {
    const sortedMovies = [...movies].sort((a, b) => a.rating - b.rating);
    let left = 0;
    let right = sortedMovies.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (sortedMovies[mid].rating === targetRating) {
        return sortedMovies[mid];
      } else if (sortedMovies[mid].rating < targetRating) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return null;
  }
}
