# 🧪 Testing Guide - Movie Recommendation System

## Quick Test Checklist

Use this guide to test all DSA implementations and features.

---

## 1️⃣ Array Storage Test
**Feature**: Movie Storage and Display

### Steps:
1. Open `index.html` in browser
2. Scroll to "All Movies" section
3. Verify 20 movies are displayed in grid layout
4. Check each movie shows: title, genre, rating, likes, year

### Expected Result:
✅ All 20 movies displayed correctly  
✅ Movies accessible with O(1) time  

---

## 2️⃣ Stack (Watch History) Test
**Feature**: LIFO Watch History

### Steps:
1. Click on any movie (e.g., "The Shawshank Redemption")
2. Click "Watch Now" button
3. Repeat for 3-4 different movies
4. Scroll to "Watch History" section

### Expected Result:
✅ Most recently watched movie appears first  
✅ Stack follows LIFO order (Last In, First Out)  
✅ Empty message disappears when history exists  

### Console Test:
```javascript
// Open browser console (F12)
movieSystem.watchHistory.peek()  // Should show last watched movie
movieSystem.watchHistory.size()   // Should show number of watched movies
```

---

## 3️⃣ Max Heap (Trending) Test
**Feature**: Priority Queue for Trending Movies

### Steps:
1. Note initial trending movies in "Trending Now" section
2. Click on a movie with lower likes
3. Click "Like" button multiple times (3-5 times)
4. Observe "Trending Now" section updates

### Expected Result:
✅ Trending section shows top 5 most liked movies  
✅ Movies reordered when likes change  
✅ Heap property maintained (parent ≥ children)  

### Console Test:
```javascript
// View current heap
movieSystem.trendingHeap.heap

// Check top trending
movieSystem.getTrendingMovies(5)
```

---

## 4️⃣ Graph (Movie Relationships) Test
**Feature**: BFS Traversal for Related Movies

### Steps:
1. Click on "Inception" (Sci-Fi movie)
2. Click "Show Related" button
3. Check "Related Movies" section appears
4. Verify related movies share similar attributes

### Expected Result:
✅ Related movies have same genre, similar rating, or same decade  
✅ BFS finds movies within 2 hops  
✅ Related section displays smoothly  

### Console Test:
```javascript
// Find related to movie ID 3 (Inception)
movieSystem.getRelatedMovies(3, 5)

// Check graph structure
movieSystem.movieGraph.adjacencyList
```

---

## 5️⃣ Binary Search Test
**Feature**: Efficient Title Search

### Steps:
1. Click on search input box
2. Type "Dark" (should find "The Dark Knight")
3. Type "God" (should find "The Godfather")
4. Type "xyz" (should show no results)

### Expected Result:
✅ Partial matches work correctly  
✅ Search results update in real-time  
✅ Binary search efficiency (O(log n))  
✅ No results shown for non-existent movies  

### Console Test:
```javascript
// Test binary search
movieSystem.binarySearchByTitle("matrix")  // Should find "The Matrix"
movieSystem.binarySearchByTitle("the")     // Should find movies with "the"
```

---

## 6️⃣ Genre Filter Test
**Feature**: Linear Traversal Filter

### Steps:
1. Click on "Filter by Genre" dropdown
2. Select "Sci-Fi"
3. Verify only Sci-Fi movies shown
4. Select "Drama"
5. Select "All Genres" to reset

### Expected Result:
✅ Only movies of selected genre displayed  
✅ Genre dropdown populated with all unique genres  
✅ "All Genres" shows all movies again  

### Console Test:
```javascript
// Get all genres
movieSystem.getAllGenres()

// Filter by genre
movieSystem.filterByGenre("Action")
```

---

## 7️⃣ UI Interaction Tests

### Test Modal Functionality:
1. Click any movie card
2. Verify modal opens with correct details
3. Check all buttons work (Watch, Like, Show Related)
4. Close modal with X button or outside click

### Test About Modal:
1. Click "About" button in header
2. Verify DSA concepts explained
3. Check all badges show correct data structures
4. Close modal

### Test Responsive Design:
1. Resize browser window
2. Check mobile view (< 768px)
3. Verify cards stack properly
4. Check horizontal scroll on history

---

## 8️⃣ Performance Tests

### Test Large Operations:
```javascript
// In browser console

// 1. Test multiple likes (Heap rebuild)
for(let i = 0; i < 10; i++) {
    movieSystem.likeMovie(1);
}
movieSystem.getTrendingMovies(5);

// 2. Test stack capacity
for(let i = 1; i <= 20; i++) {
    movieSystem.watchMovie(i);
}
movieSystem.getWatchHistory();

// 3. Test graph traversal
movieSystem.getRelatedMovies(1, 10);

// 4. Test search efficiency
console.time('search');
movieSystem.binarySearchByTitle("the");
console.timeEnd('search');
```

---

## 9️⃣ Edge Cases

### Test Empty States:
- Fresh load → No watch history (should show empty message)
- Invalid movie ID → Should handle gracefully
- No related movies → Should show notification

### Test Boundary Conditions:
```javascript
// Stack operations on empty stack
movieSystem.watchHistory.pop()      // Should return null
movieSystem.watchHistory.peek()     // Should return null

// Search for non-existent movie
movieSystem.binarySearchByTitle("zzzzz")  // Should return empty array

// Get related for isolated movie
movieSystem.getRelatedMovies(999, 5)  // Should handle gracefully
```

---

## 🔟 Complexity Verification

### Verify Big-O Notations:

Open `app.js` and check comments include:
- ✅ O(1) for array access, stack push/pop
- ✅ O(log n) for binary search, heap operations
- ✅ O(n) for linear traversal, filters
- ✅ O(V + E) for graph BFS/DFS
- ✅ Space complexity documented

---

## 📊 Final Checklist

Before submitting, verify:

- [ ] All 20 movies load correctly
- [ ] Search works with partial matches
- [ ] Genre filter shows correct movies
- [ ] Watch history follows LIFO order
- [ ] Trending updates when movies are liked
- [ ] Related movies use graph traversal
- [ ] All modals open and close properly
- [ ] Responsive design works on mobile
- [ ] Console shows initialization logs
- [ ] No JavaScript errors in console
- [ ] README.md explains all DSA concepts
- [ ] Code has proper comments
- [ ] Big-O notation included

---

## 🐛 Common Issues & Solutions

### Issue: Movies don't load
**Solution**: Check browser console for errors, ensure `app.js` is linked

### Issue: Trending doesn't update
**Solution**: Heap rebuild happens automatically, refresh if needed

### Issue: Related movies not showing
**Solution**: Some movies may have no connections, try different movies

### Issue: Search not working
**Solution**: Binary search requires sorting, implemented automatically

---

## 💻 Browser Console Commands

Useful commands for testing:

```javascript
// View system state
movieSystem

// Check all movies
movieSystem.movies

// View watch history stack
movieSystem.watchHistory

// View trending heap
movieSystem.trendingHeap

// View movie graph
movieSystem.movieGraph

// Get specific movie
movieSystem.getMovieById(5)

// Manual operations
movieSystem.watchMovie(3)
movieSystem.likeMovie(7)
movieSystem.getRelatedMovies(2, 5)
movieSystem.binarySearchByTitle("inception")
```

---

## ✅ Success Criteria

Your project successfully demonstrates DSA concepts if:

1. **Array**: Fast O(1) movie access and display
2. **Stack**: LIFO watch history with correct ordering
3. **Max Heap**: Dynamic trending list with O(log n) updates
4. **Graph**: BFS finds related movies efficiently
5. **Binary Search**: O(log n) search performance
6. **UI**: Clean, responsive, professional design
7. **Code Quality**: Well-commented, organized, readable
8. **Documentation**: Complete README with complexity analysis

---

**Happy Testing! 🎉**

*If all tests pass, your DSA project is ready for submission!*
