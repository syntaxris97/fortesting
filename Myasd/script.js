// API Configuration - Using TMDB API
const API_KEY = '04c35731a5ee918f014970082a0088b1';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

// DOM Elements
const featuredMoviesEl = document.getElementById('featured-movies');
const popularMoviesEl = document.getElementById('popular-movies');
const latestMoviesEl = document.getElementById('latest-movies');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const movieModal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const mobileMenu = document.querySelector('.mobile-menu');

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
searchBtn.addEventListener('click', performSearch);
closeModal.addEventListener('click', closeMovieModal);
window.addEventListener('click', (event) => {
    if (event.target === movieModal) {
        closeMovieModal();
    }
});

mobileMenu.addEventListener('click', toggleMobileMenu);

// Initialize App
async function initApp() {
    try {
        // Get Featured Movies
        const featuredMovies = await fetchMovies('movie/popular', { page: 1 });
        
        // Get Popular Movies
        const popularMovies = await fetchMovies('discover/movie', { 
            sort_by: 'popularity.desc', 
            page: 1
        });
        
        // Get Latest Movies
        const latestMovies = await fetchMovies('movie/now_playing', { page: 1 });
        
        // Render Movies
        renderMovies(featuredMovies.results.slice(0, 8), featuredMoviesEl);
        renderMovies(popularMovies.results, popularMoviesEl);
        renderMovies(latestMovies.results, latestMoviesEl);
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Fetch Movies from TMDB API
async function fetchMovies(endpoint, params = {}) {
    try {
        const queryParams = new URLSearchParams({
            api_key: API_KEY,
            ...params
        });
        
        const response = await fetch(`${TMDB_BASE_URL}/${endpoint}?${queryParams}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { results: [] };
    }
}

// Render Movies
function renderMovies(movies, container) {
    container.innerHTML = '';
    
    movies.forEach(movie => {
        // Skip movies without poster
        if (!movie.poster_path) return;
        
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
        `;
        
        movieCard.addEventListener('click', () => openMovieDetails(movie.id));
        container.appendChild(movieCard);
    });
}

// Open Movie Details Modal
async function openMovieDetails(movieId) {
    try {
        showLoading(modalBody);
        movieModal.style.display = 'block';
        
        const movieDetails = await fetchMovieDetails(movieId);
        renderMovieDetails(movieDetails);
    } catch (error) {
        console.error('Error opening movie details:', error);
        modalBody.innerHTML = '<p>Error loading movie details. Please try again.</p>';
    }
}

// Fetch Movie Details
async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

// Render Movie Details
function renderMovieDetails(movie) {
    const genres = movie.genres.map(genre => genre.name).join(', ');
    const director = movie.credits?.crew.find(person => person.job === 'Director')?.name || 'N/A';
    const trailer = movie.videos?.results.find(video => video.type === 'Trailer') || null;
    
    modalBody.innerHTML = `
        <div class="movie-detail">
            <div class="movie-poster">
                <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-detail-info">
                <h2>${movie.title}</h2>
                <div class="movie-meta">
                    <span><i class="fas fa-calendar"></i> ${movie.release_date.split('-')[0]}</span>
                    <span><i class="fas fa-clock"></i> ${movie.runtime} min</span>
                    <span><i class="fas fa-star"></i> ${movie.vote_average.toFixed(1)}</span>
                </div>
                <div class="movie-overview">
                    <p>${movie.overview}</p>
                </div>
                <div class="movie-meta">
                    <span><strong>Genre:</strong> ${genres}</span>
                    <span><strong>Director:</strong> ${director}</span>
                </div>
                <button class="btn-watch" onclick="watchMovie(${movie.id}, '${movie.title}')">
                    <i class="fas fa-play"></i> Watch Now
                </button>
                ${trailer ? `
                <button class="btn-watch" style="background-color: #333; margin-left: 10px;" 
                    onclick="watchTrailer('${trailer.key}')">
                    <i class="fas fa-film"></i> Watch Trailer
                </button>` : ''}
            </div>
        </div>
    `;
}

// Watch Movie Function
function watchMovie(movieId, movieTitle) {
    // Create player page HTML
    const playerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Watch ${movieTitle} - MyMovs</title>
        <link rel="stylesheet" href="styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body>
        <!-- Header Section -->
        <header>
            <div class="container">
                <div class="logo">
                    <h1><a href="index.html">MyMovs</a></h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="#">Movies</a></li>
                        <li><a href="#">TV Shows</a></li>
                        <li><a href="#">Top Rated</a></li>
                    </ul>
                </nav>
                <div class="mobile-menu">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </header>

        <!-- Player Section -->
        <div class="player-container">
            <div class="video-container">
                <div id="loading" class="loading">
                    <div class="spinner"></div>
                </div>
                <video id="video-player" class="video-player" controls autoplay>
                    <source src="#" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="player-controls">
                <div class="player-info">
                    <h3>${movieTitle}</h3>
                </div>
                <div class="player-buttons">
                    <button id="back-btn" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                </div>
            </div>
        </div>

        <script>
            // Simulate video loading
            setTimeout(() => {
                document.getElementById('loading').style.display = 'none';
                const player = document.getElementById('video-player');
                player.pause();
                
                // Alert user about demo functionality
                alert("This is a demo. In a real application, this would play the actual movie from your content server.");
                
                // Show sample video
                player.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #000; color: #fff; font-size: 24px; text-align: center; padding: 20px;">Demo: This would be the ${movieTitle} video player</div>';
            }, 3000);
        </script>
    </body>
    </html>
    `;
    
    // Open player in new window or tab
    const playerWindow = window.open('', '_blank');
    playerWindow.document.write(playerHTML);
    playerWindow.document.close();
}

// Watch Trailer Function
function watchTrailer(videoKey) {
    const trailerUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
    window.open(trailerUrl, '_blank');
}

// Perform Search
async function performSearch() {
    const query = searchInput.value.trim();
    
    if (query) {
        try {
            const searchResults = await fetchMovies('search/movie', { query });
            
            // Show search results modal
            showSearchResults(searchResults.results);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    }
}

// Show Search Results
function showSearchResults(results) {
    closeMovieModal();
    
    modalBody.innerHTML = `
        <h2>Search Results</h2>
        <div class="movie-grid" id="search-results"></div>
    `;
    
    const searchResultsEl = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResultsEl.innerHTML = '<p>No results found. Please try another search term.</p>';
    } else {
        renderMovies(results, searchResultsEl);
    }
    
    movieModal.style.display = 'block';
}

// Close Movie Modal
function closeMovieModal() {
    movieModal.style.display = 'none';
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Show Loading Spinner
function showLoading(container) {
    container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 200px;">
            <div class="spinner"></div>
        </div>
    `;
}

// Handle Search with Enter Key
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});
