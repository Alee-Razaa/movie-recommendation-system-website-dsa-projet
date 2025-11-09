// ============================================
// MAIN APP CONTROLLER
// ============================================
// Connects UI with Fake API and DSA modules
// Handles all user interactions and updates

import { fetchMovies, fetchGenres } from './fakeApi.js';
import { Stack, MaxHeap, MovieGraph, BinarySearch } from './dsa.js';

// ============================================
// GLOBAL STATE
// ============================================

let movies = []; // Array storage - O(1) access
let watchHistory = new Stack(); // Stack for watch history - LIFO
let trendingHeap = new MaxHeap(); // Max Heap for trending movies
let movieGraph = new MovieGraph(); // Graph for movie relationships
let likedMovies = new Set(); // Set for liked movie IDs - O(1) lookup
let currentMovie = null; // Currently selected movie for modal
let sortBy = 'default'; // Sorting mode: 'default', 'priority', 'likes', 'views'

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize application on page load
 * Loads movies from API and sets up data structures
 */
async function initApp() {
  try {
    console.log('🎬 Initializing Movie Recommendation System...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Fetch movies from fake API
    movies = await fetchMovies();
    console.log(`📊 Loaded ${movies.length} movies from API`);
    console.log(`📝 Sample movie:`, movies[0]);
    
    // Load watch history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    savedHistory.forEach(movie => watchHistory.push(movie));
    console.log(`📚 Restored ${savedHistory.length} items from watch history`);
    
    // Load liked movies from localStorage
    const savedLiked = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    savedLiked.forEach(movie => likedMovies.add(movie.id));
    console.log(`❤️ Restored ${savedLiked.length} liked movies`);
    
    // Build trending heap
    console.log('\n🔥 Building Max Heap for trending movies...');
    trendingHeap.rebuild(movies);
    console.log(`   Heap size: ${trendingHeap.size()}`);
    console.log(`   Top trending:`, trendingHeap.peek());
    
    // Build movie graph
    console.log('\n🌐 Building Graph for movie relationships...');
    buildMovieGraph();
    
    // Populate UI
    displayMovies(movies);
    displayTrending();
    await populateGenreFilter();
    updateHistory();
    
    // Update counters
    updateHistoryCount();
    const likedCountBadge = document.getElementById('likedCount');
    if (likedCountBadge) likedCountBadge.textContent = likedMovies.size;
    
    console.log('\n✅ Application ready!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📚 Data Structures in Use:');
    console.log('   - Array: Movie Storage (O(1) access)');
    console.log('   - Stack: Watch History (LIFO)');
    console.log('   - Max Heap: Trending Movies (Priority Queue)');
    console.log('   - Graph: Movie Relationships (BFS/DFS)');
    console.log('   - Binary Search: Title Search (O(log n))');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('💡 Try these commands:');
    console.log('   movieSystem.watchHistory.getAll()');
    console.log('   movieSystem.trendingHeap.getTopK(5)');
    console.log('   movieSystem.movieGraph.bfs(1, 2)\n');
    
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    showNotification('Failed to load movies. Please refresh the page.', 'error');
  }
}

/**
 * Build graph of movie relationships
 * Creates edges based on genre, rating, year, and predefined relations
 * Time Complexity: O(V + E) where V is vertices, E is edges
 */
function buildMovieGraph() {
  // Add all movies as vertices
  movies.forEach(movie => {
    movieGraph.addMovie(movie.id);
  });

  // Add predefined relationships from API
  movies.forEach(movie => {
    if (movie.related && movie.related.length > 0) {
      movie.related.forEach(relatedId => {
        movieGraph.addRelation(movie.id, relatedId);
      });
    }
  });

  // Add dynamic relationships based on similarity
  for (let i = 0; i < movies.length; i++) {
    for (let j = i + 1; j < movies.length; j++) {
      const movie1 = movies[i];
      const movie2 = movies[j];

      // Connect if same genre
      if (movie1.genre === movie2.genre) {
        movieGraph.addRelation(movie1.id, movie2.id);
      }
      // Connect if similar ratings (within 0.3)
      else if (Math.abs(movie1.rating - movie2.rating) <= 0.3) {
        movieGraph.addRelation(movie1.id, movie2.id);
      }
      // Connect if same decade
      else if (Math.floor(movie1.year / 10) === Math.floor(movie2.year / 10)) {
        movieGraph.addRelation(movie1.id, movie2.id);
      }
    }
  }

  console.log(`   Graph: ${movieGraph.getVertexCount()} vertices, ${movieGraph.getEdgeCount()} edges`);
}

// ============================================
// UI RENDERING FUNCTIONS
// ============================================

/**
 * Sort movies using Priority Queue based on likes and views
 * @param {Array} movieList - Movies to sort
 * @returns {Array} Sorted movies
 */
function sortMoviesByPriority(movieList) {
  console.log('\n🔢 Priority Queue Sorting:');
  console.log(`   Sorting ${movieList.length} movies by priority (likes + views)`);
  console.time('   Sort time');
  
  // Create a max heap for priority sorting
  const priorityHeap = new MaxHeap();
  
  // Insert movies with calculated priority
  movieList.forEach(movie => {
    // Priority = likes + (views * 2) to give more weight to watched movies
    const movieWithPriority = {
      ...movie,
      priority: movie.likes + (movie.views * 2)
    };
    priorityHeap.insert(movieWithPriority);
  });
  
  // Extract all movies in priority order
  const sorted = [];
  while (priorityHeap.size() > 0) {
    sorted.push(priorityHeap.extractMax());
  }
  
  console.timeEnd('   Sort time');
  console.log(`   Top movie: "${sorted[0]?.title}" (Priority: ${sorted[0]?.priority})`);
  console.log(`   Complexity: O(n log n) heap sort`);
  
  return sorted;
}

/**
 * Display movies in grid
 * @param {Array} movieList - Movies to display
 */
function displayMovies(movieList) {
  const container = document.getElementById('moviesContainer');
  if (!container) {
    console.error('❌ Movies container not found!');
    return;
  }
  
  if (!movieList || movieList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-20 text-gray-400">
        <i class="fas fa-search text-8xl mb-4 opacity-20"></i>
        <h3 class="text-2xl font-bold mb-2">No movies found</h3>
        <p>Try a different search term or filter!</p>
      </div>
    `;
    return;
  }
  
  // Sort by priority if enabled
  let displayList = movieList;
  if (sortBy === 'priority') {
    displayList = sortMoviesByPriority(movieList);
  }
  
  container.innerHTML = displayList.map(movie => createMovieCard(movie)).join('');
  
  // Attach click events
  container.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
      showMovieDetails(parseInt(card.dataset.movieId));
    });
  });
}

/**
 * Create HTML for movie card
 * @param {Object} movie - Movie object
 * @returns {string} HTML string
 */
function createMovieCard(movie) {
  return `
    <div class="movie-card bg-gray-700 rounded-lg overflow-hidden cursor-pointer fade-in" data-movie-id="${movie.id}">
      <div class="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <i class="fas fa-film text-4xl sm:text-5xl md:text-6xl text-white/30"></i>
      </div>
      <div class="p-2 sm:p-3 md:p-4">
        <h3 class="font-bold text-sm sm:text-base md:text-lg mb-2 truncate" title="${movie.title}">${movie.title}</h3>
        <div class="flex items-center justify-between text-xs sm:text-sm text-gray-400">
          <span class="genre-badge bg-purple-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">${movie.genre}</span>
          <span><i class="fas fa-star text-yellow-400"></i> ${movie.rating}</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span><i class="fas fa-heart text-red-400"></i> ${movie.likes}</span>
          <span>${movie.year}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Display trending movies
 * Uses Max Heap to get top movies by likes
 */
function displayTrending() {
  const trending = trendingHeap.getTopK(5);
  const container = document.getElementById('trendingContainer');
  container.innerHTML = trending.map(movie => createMovieCard(movie)).join('');
  
  container.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
      showMovieDetails(parseInt(card.dataset.movieId));
    });
  });
}

/**
 * Update watch history display
 * Shows most recent watches first (Stack LIFO)
 */
function updateHistory() {
  // Just update the counter - history page removed from home
  updateHistoryCount();
}

/**
 * Populate genre filter dropdown
 */
async function populateGenreFilter() {
  const genres = await fetchGenres();
  const select = document.getElementById('genreFilter');
  
  // Clear existing options except "All Genres"
  select.innerHTML = '<option value="">All Genres</option>';
  
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

// ============================================
// USER INTERACTION HANDLERS
// ============================================

/**
 * Handle search input
 * Uses Binary Search for efficient lookup
 * Time Complexity: O(log n)
 */
window.handleSearch = function() {
  const searchInput = document.getElementById('searchInput');
  const titleElement = document.getElementById('allMoviesTitle');
  
  if (!searchInput) {
    console.error('❌ Search input not found!');
    return;
  }
  
  const query = searchInput.value.trim().toLowerCase();
  
  if (query === '') {
    // Show all movies
    displayMovies(movies);
    if (titleElement) titleElement.textContent = 'All Movies';
    
    const relatedSection = document.getElementById('relatedSection');
    if (relatedSection) relatedSection.style.display = 'none';
    return;
  }
  
  console.log(`🔍 Search: "${query}"`);
  console.time('Search time');
  
  // Filter movies by title (case-insensitive)
  const results = movies.filter(movie => 
    movie.title.toLowerCase().includes(query)
  );
  
  console.timeEnd('Search time');
  console.log(`Found ${results.length} result(s)`);
  
  // Update title to show search results
  if (titleElement) {
    titleElement.textContent = `Search Results for "${query}" (${results.length})`;
  }
  
  displayMovies(results);
};

/**
 * Handle genre filter change
 * Time Complexity: O(n) for array filter
 */
window.handleGenreFilter = function() {
  const genreFilter = document.getElementById('genreFilter');
  const titleElement = document.getElementById('allMoviesTitle');
  const searchInput = document.getElementById('searchInput');
  
  if (!genreFilter) {
    console.error('❌ Genre filter not found!');
    return;
  }
  
  const genre = genreFilter.value;
  
  if (!genre || genre === '') {
    // Show all movies
    console.log(`Showing all ${movies.length} movies`);
    displayMovies(movies);
    if (titleElement) titleElement.textContent = 'All Movies';
  } else {
    console.log(`🎭 Filter: ${genre}`);
    const filtered = movies.filter(movie => movie.genre === genre);
    console.log(`Found ${filtered.length} ${genre} movies`);
    
    // Update title to show filtered genre
    if (titleElement) {
      titleElement.textContent = `${genre} Movies (${filtered.length})`;
    }
    
    displayMovies(filtered);
  }
  
  // Reset search input
  if (searchInput) searchInput.value = '';
  
  // Hide related section
  const relatedSection = document.getElementById('relatedSection');
  if (relatedSection) relatedSection.style.display = 'none';
};

/**
 * Show movie details modal
 */
window.showMovieDetails = function(movieId) {
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return;

  // Store current movie ID globally
  window.currentMovieId = movieId;
  
  document.getElementById('modalTitle').textContent = movie.title;
  document.getElementById('modalContent').innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center gap-4 text-sm">
        <span class="bg-purple-600 px-3 py-1 rounded">${movie.genre}</span>
        <span><i class="fas fa-star text-yellow-400"></i> ${movie.rating}/10</span>
        <span><i class="fas fa-calendar text-blue-400"></i> ${movie.year}</span>
      </div>
      <p class="text-gray-300">${movie.description}</p>
      <div class="grid grid-cols-2 gap-4 pt-4">
        <div class="bg-gray-700 p-3 rounded">
          <p class="text-gray-400 text-sm">Likes</p>
          <p class="text-2xl font-bold text-red-400"><i class="fas fa-heart"></i> ${movie.likes}</p>
        </div>
        <div class="bg-gray-700 p-3 rounded">
          <p class="text-gray-400 text-sm">Views</p>
          <p class="text-2xl font-bold text-blue-400"><i class="fas fa-eye"></i> ${movie.views}</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('movieModal').classList.remove('hidden');
  document.getElementById('movieModal').classList.add('flex');
};

/**
 * Close movie modal
 */
window.closeModal = function() {
  document.getElementById('movieModal').classList.add('hidden');
  document.getElementById('movieModal').classList.remove('flex');
  window.currentMovieId = null;
};

/**
 * Watch movie - Add to history stack
 * Time Complexity: O(1) for stack push
 */
window.watchMovie = function() {
  if (!window.currentMovieId) return;
  
  const movie = movies.find(m => m.id === window.currentMovieId);
  if (movie) {
    // Increment views
    movie.views++;
    
    // Check if movie already exists in history
    const existingMovies = watchHistory.getAll();
    const isDuplicate = existingMovies.some(m => m.id === movie.id);
    
    if (isDuplicate) {
      console.log(`\n⚠️ Duplicate Prevention:`);
      console.log(`   "${movie.title}" already in watch history`);
      console.log(`   Skipping duplicate entry`);
      showNotification(`"${movie.title}" already in watch history!`, 'info');
      closeModal();
      return;
    }
    
    // Add to watch history (Stack - LIFO)
    watchHistory.push(movie);
    
    console.log(`\n📺 Stack Operation (Watch History):`);
    console.log(`   Pushed: "${movie.title}"`);
    console.log(`   Stack size: ${watchHistory.size()}`);
    console.log(`   Top of stack (peek):`, watchHistory.peek().title);
    console.log(`   Complexity: O(1) push operation`);
    console.log(`   Current history (LIFO order):`, watchHistory.getAll().map(m => m.title));
    
    // Save to localStorage
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory.getAll()));
    
    updateHistory();
    updateHistoryCount(); // Update the count badge
    showNotification(`Added "${movie.title}" to watch history!`, 'success');
    closeModal();
  }
};

/**
 * Like movie - Update trending heap
 * Time Complexity: O(n) for heap rebuild (could be optimized to O(log n))
 */
window.likeMovie = function() {
  if (!window.currentMovieId) return;
  
  const movie = movies.find(m => m.id === window.currentMovieId);
  if (movie) {
    const oldLikes = movie.likes;
    movie.likes++;
    
    // Add to liked movies set
    likedMovies.add(movie.id);
    
    console.log(`\n❤️ Max Heap Operation (Trending):`);
    console.log(`   Movie: "${movie.title}"`);
    console.log(`   Likes: ${oldLikes} → ${movie.likes}`);
    console.time('   Heap rebuild time');
    
    // Rebuild trending heap
    trendingHeap.rebuild(movies);
    
    console.timeEnd('   Heap rebuild time');
    console.log(`   Heap size: ${trendingHeap.size()}`);
    console.log(`   New top trending:`, trendingHeap.peek().title);
    console.log(`   Top 5 trending:`, trendingHeap.getTopK(5).map(m => `${m.title} (${m.likes})`));
    console.log(`   Complexity: O(n) rebuild, could optimize to O(log n)`);
    
    // Save to localStorage
    const likedMoviesList = movies.filter(m => likedMovies.has(m.id));
    localStorage.setItem('likedMovies', JSON.stringify(likedMoviesList));
    
    // Update badge count
    const countBadge = document.getElementById('likedCount');
    if (countBadge) countBadge.textContent = likedMovies.size;
    
    displayTrending();
    showNotification(`Liked "${movie.title}"! ❤️`, 'success');
    showMovieDetails(window.currentMovieId); // Refresh modal
  }
};

/**
 * Show related movies using Graph BFS
 * Time Complexity: O(V + E) for BFS traversal
 */
window.showRelatedMovies = function() {
  if (!window.currentMovieId) return;
  
  const currentMovie = movies.find(m => m.id === window.currentMovieId);
  
  console.log(`\n🌐 Graph BFS Operation (Related Movies):`);
  console.log(`   Starting from: "${currentMovie.title}" (ID: ${window.currentMovieId})`);
  console.time('   BFS traversal time');
  
  // Use BFS to find related movies
  const relatedIds = movieGraph.bfs(window.currentMovieId, 2);
  
  console.timeEnd('   BFS traversal time');
  console.log(`   Found ${relatedIds.length} related movie IDs:`, relatedIds);
  console.log(`   Max depth: 2 hops`);
  console.log(`   Complexity: O(V + E) where V=${movieGraph.getVertexCount()}, E=${movieGraph.getEdgeCount()}`);
  
  const relatedMovies = relatedIds
    .map(id => movies.find(m => m.id === id))
    .filter(movie => movie !== undefined)
    .slice(0, 5);

  console.log(`   Related movies:`, relatedMovies.map(m => m.title));

  if (relatedMovies.length > 0) {
    const section = document.getElementById('relatedSection');
    const container = document.getElementById('relatedContainer');
    
    section.style.display = 'block';
    container.innerHTML = relatedMovies.map(movie => createMovieCard(movie)).join('');
    
    container.querySelectorAll('.movie-card').forEach(card => {
      card.addEventListener('click', () => {
        showMovieDetails(parseInt(card.dataset.movieId));
      });
    });

    // Scroll to related section
    section.scrollIntoView({ behavior: 'smooth' });
    closeModal();
  } else {
    console.log('   ⚠️ No related movies found');
    showNotification('No related movies found!', 'info');
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Update watch history count badge
 */
function updateHistoryCount() {
  const countBadge = document.getElementById('historyCount');
  if (countBadge) {
    countBadge.textContent = watchHistory.size();
  }
}

/**
 * Show notification toast
 * @param {string} message - Notification message
 * @param {string} type - Type of notification (success, error, info)
 */
window.showNotification = function(message, type = 'info') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎯 DOM Content Loaded - Attaching event listeners...');
  
  // Initialize app
  initApp();
  
  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    console.log('✅ Search input listener attached');
  } else {
    console.error('❌ Search input not found!');
  }
  
  // Genre filter
  const genreFilter = document.getElementById('genreFilter');
  if (genreFilter) {
    genreFilter.addEventListener('change', handleGenreFilter);
    console.log('✅ Genre filter listener attached');
  } else {
    console.error('❌ Genre filter not found!');
  }
  
  // Sort dropdown
  const sortDropdown = document.getElementById('sortDropdown');
  if (sortDropdown) {
    sortDropdown.addEventListener('change', (e) => {
      sortBy = e.target.value;
      console.log(`\n📊 Sort mode changed to: ${sortBy}`);
      
      // Re-display movies with new sort order
      const searchInput = document.getElementById('searchInput');
      const genreFilter = document.getElementById('genreFilter');
      const searchTerm = searchInput ? searchInput.value.trim() : '';
      const selectedGenre = genreFilter ? genreFilter.value : '';
      
      if (searchTerm || selectedGenre) {
        // If filtering is active, trigger the filter again
        if (searchTerm) {
          handleSearch({ target: { value: searchTerm } });
        } else {
          handleGenreFilter({ target: { value: selectedGenre } });
        }
      } else {
        // Show all movies with new sort
        displayMovies(movies);
        updateAllMoviesTitle(movies.length, searchTerm, selectedGenre);
      }
    });
    console.log('✅ Sort dropdown listener attached');
  } else {
    console.error('❌ Sort dropdown not found!');
  }
  
  // Modal controls
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('watchBtn').addEventListener('click', watchMovie);
  document.getElementById('likeBtn').addEventListener('click', likeMovie);
  document.getElementById('showRelatedBtn').addEventListener('click', showRelatedMovies);
  console.log('✅ Modal controls listeners attached');
  
  // Close modals on outside click
  document.getElementById('movieModal').addEventListener('click', (e) => {
    if (e.target.id === 'movieModal') closeModal();
  });
});

// ============================================
// EXPORT FOR CONSOLE DEBUGGING
// ============================================

// Make data structures accessible in console for testing
window.movieSystem = {
  movies,
  watchHistory,
  trendingHeap,
  movieGraph,
  BinarySearch
};
