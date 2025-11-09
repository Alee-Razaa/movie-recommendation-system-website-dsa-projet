// ============================================
// FAKE API - Real Movie Data Source
// ============================================
// Fetches data from public fake APIs and enriches it
// with DSA-required fields (likes, views, related)

const API_URLS = {
  primary: 'https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies',
  fallback: 'https://api.sampleapis.com/movies/action-adventure'
};

/**
 * Fetch movies from real fake API
 * Falls back to local data if API fails
 * @returns {Promise<Array>} Array of enriched movie objects
 */
export const fetchMovies = async () => {
  try {
    console.log('📡 Fetching movies from API...');
    
    // Try primary API first
    let response = await fetch(API_URLS.primary);
    let data = await response.json();
    
    // Handle if data is object with movies property
    let movies = Array.isArray(data) ? data : (data.movies || []);
    
    // If primary has too few movies, try fallback
    if (!movies || movies.length < 10) {
      console.log('⚠️ Primary API has insufficient data, trying fallback...');
      response = await fetch(API_URLS.fallback);
      data = await response.json();
      movies = Array.isArray(data) ? data : (data.movies || []);
    }
    
    // If still not enough, use local fallback
    if (!movies || movies.length < 10) {
      console.log('⚠️ External APIs insufficient, using local fallback data');
      return getFallbackMovies();
    }
    
    // Enrich movies with DSA fields
    const enrichedMovies = movies.slice(0, 20).map((movie, index) => ({
      id: movie.id || index + 1,
      title: movie.title || movie.Title || `Movie ${index + 1}`,
      genre: movie.genre || movie.Genre || getRandomGenre(),
      rating: parseFloat(movie.rating || movie.imdbRating || (Math.random() * 2 + 7).toFixed(1)),
      year: parseInt(movie.year || movie.Year || Math.floor(Math.random() * 30) + 1990),
      description: movie.description || movie.Plot || 'An exciting movie experience.',
      likes: Math.floor(Math.random() * 1000) + 100,
      views: 0,
      related: [] // Will be populated after all movies are loaded
    }));
    
    // Generate related movie connections
    enrichedMovies.forEach((movie, i) => {
      const relatedIds = [];
      enrichedMovies.forEach((other, j) => {
        if (i !== j && movie.genre === other.genre && relatedIds.length < 3) {
          relatedIds.push(other.id);
        }
      });
      movie.related = relatedIds;
    });
    
    console.log(`✅ Loaded ${enrichedMovies.length} movies from API`);
    return enrichedMovies;
    
  } catch (error) {
    console.error('❌ API fetch failed, using fallback local data:', error);
    
    // Fallback to local data if all APIs fail
    return getFallbackMovies();
  }
};

/**
 * Get random genre for movies without genre info
 */
function getRandomGenre() {
  const genres = ['Action', 'Drama', 'Sci-Fi', 'Crime', 'Thriller', 'Animation', 'Romance', 'Comedy'];
  return genres[Math.floor(Math.random() * genres.length)];
}

/**
 * Fallback movie data if API is unavailable
 * @returns {Array} Array of movie objects
 */
function getFallbackMovies() {
  console.log('📦 Using fallback local movie data');
  
  return [
        { 
          id: 1, 
          title: "The Shawshank Redemption", 
          genre: "Drama", 
          rating: 9.3, 
          year: 1994, 
          description: "Two imprisoned men bond over years, finding solace and redemption through acts of common decency.",
          likes: 856,
          views: 0,
          related: [6, 12, 5] // Related movie IDs
        },
        { 
          id: 2, 
          title: "The Dark Knight", 
          genre: "Action", 
          rating: 9.0, 
          year: 2008, 
          description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
          likes: 723,
          views: 0,
          related: [13, 19, 20]
        },
        { 
          id: 3, 
          title: "Inception", 
          genre: "Sci-Fi", 
          rating: 8.8, 
          year: 2010, 
          description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task.",
          likes: 892,
          views: 0,
          related: [7, 8, 18]
        },
        { 
          id: 4, 
          title: "Pulp Fiction", 
          genre: "Crime", 
          rating: 8.9, 
          year: 1994, 
          description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence.",
          likes: 645,
          views: 0,
          related: [5, 9, 14]
        },
        { 
          id: 5, 
          title: "The Godfather", 
          genre: "Crime", 
          rating: 9.2, 
          year: 1972, 
          description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
          likes: 934,
          views: 0,
          related: [4, 9, 14]
        },
        { 
          id: 6, 
          title: "Forrest Gump", 
          genre: "Drama", 
          rating: 8.8, 
          year: 1994, 
          description: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
          likes: 778,
          views: 0,
          related: [1, 12, 20]
        },
        { 
          id: 7, 
          title: "The Matrix", 
          genre: "Sci-Fi", 
          rating: 8.7, 
          year: 1999, 
          description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
          likes: 812,
          views: 0,
          related: [3, 8, 18]
        },
        { 
          id: 8, 
          title: "Interstellar", 
          genre: "Sci-Fi", 
          rating: 8.6, 
          year: 2014, 
          description: "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
          likes: 701,
          views: 0,
          related: [3, 7, 18]
        },
        { 
          id: 9, 
          title: "Goodfellas", 
          genre: "Crime", 
          rating: 8.7, 
          year: 1990, 
          description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife.",
          likes: 589,
          views: 0,
          related: [4, 5, 14]
        },
        { 
          id: 10, 
          title: "The Silence of the Lambs", 
          genre: "Thriller", 
          rating: 8.6, 
          year: 1991, 
          description: "A young FBI cadet must receive the help of an incarcerated cannibal killer to catch another serial killer.",
          likes: 623,
          views: 0,
          related: [15]
        },
        { 
          id: 11, 
          title: "Saving Private Ryan", 
          genre: "War", 
          rating: 8.6, 
          year: 1998, 
          description: "Following the Normandy Landings, a group of soldiers go behind enemy lines to retrieve a paratrooper.",
          likes: 567,
          views: 0,
          related: [13]
        },
        { 
          id: 12, 
          title: "The Green Mile", 
          genre: "Drama", 
          rating: 8.6, 
          year: 1999, 
          description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of murder.",
          likes: 534,
          views: 0,
          related: [1, 6]
        },
        { 
          id: 13, 
          title: "Gladiator", 
          genre: "Action", 
          rating: 8.5, 
          year: 2000, 
          description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
          likes: 498,
          views: 0,
          related: [2, 11, 19]
        },
        { 
          id: 14, 
          title: "The Departed", 
          genre: "Crime", 
          rating: 8.5, 
          year: 2006, 
          description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang.",
          likes: 445,
          views: 0,
          related: [4, 5, 9]
        },
        { 
          id: 15, 
          title: "The Prestige", 
          genre: "Mystery", 
          rating: 8.5, 
          year: 2006, 
          description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion.",
          likes: 412,
          views: 0,
          related: [10, 3]
        },
        { 
          id: 16, 
          title: "Django Unchained", 
          genre: "Western", 
          rating: 8.4, 
          year: 2012, 
          description: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a plantation.",
          likes: 389,
          views: 0,
          related: [4]
        },
        { 
          id: 17, 
          title: "WALL-E", 
          genre: "Animation", 
          rating: 8.4, 
          year: 2008, 
          description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey.",
          likes: 456,
          views: 0,
          related: []
        },
        { 
          id: 18, 
          title: "Avatar", 
          genre: "Sci-Fi", 
          rating: 7.8, 
          year: 2009, 
          description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between duty and honor.",
          likes: 523,
          views: 0,
          related: [3, 7, 8]
        },
        { 
          id: 19, 
          title: "The Avengers", 
          genre: "Action", 
          rating: 8.0, 
          year: 2012, 
          description: "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
          likes: 601,
          views: 0,
          related: [2, 13]
        },
        { 
          id: 20, 
          title: "Joker", 
          genre: "Drama", 
          rating: 8.4, 
          year: 2019, 
          description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded by society and turns to a life of crime.",
          likes: 687,
          views: 0,
          related: [2, 6]
        }
      ];
}

/**
 * Get all unique genres from movies
 * @returns {Promise<Array>} Array of unique genre strings
 */
export const fetchGenres = () => {
  return fetchMovies().then(movies => {
    const genres = new Set();
    movies.forEach(movie => genres.add(movie.genre));
    return Array.from(genres).sort();
  });
};

/**
 * Fetch single movie by ID
 * @param {number} id - Movie ID
 * @returns {Promise<Object|null>} Movie object or null if not found
 */
export const fetchMovieById = (id) => {
  return fetchMovies().then(movies => {
    return movies.find(movie => movie.id === id) || null;
  });
};

/**
 * Simulated API endpoint for searching movies
 * @param {string} query - Search query
 * @returns {Promise<Array>} Filtered movies
 */
export const searchMovies = (query) => {
  return fetchMovies().then(movies => {
    const lowerQuery = query.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(lowerQuery)
    );
  });
};

/**
 * Simulated API endpoint for filtering by genre
 * @param {string} genre - Genre to filter
 * @returns {Promise<Array>} Filtered movies
 */
export const filterByGenre = (genre) => {
  return fetchMovies().then(movies => {
    if (!genre || genre === 'All') return movies;
    return movies.filter(movie => movie.genre === genre);
  });
};
