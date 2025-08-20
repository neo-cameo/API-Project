let isLoading = false;
let currentFilter = '';


document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter__button')
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'))
            this.classList.add('active')
            
            currentFilter = this.dataset.type

            const title = document.getElementById('movieTitle').value.trim()
            if (title) {
                movieSearch()
            }
        })
    })
})

async function movieSearch() {
    const title = document.getElementById('movieTitle').value.trim()
    const searchBtn = document.getElementById('searchBtn')
    const movieListEl = document.querySelector(".movie__container")
    
    if (!title) {
        movieListEl.innerHTML = `<div class="error__massege">Make sure your spelling is correct and a title is in the search bar!</div>`
        return
    }
    
    if (isLoading) return 
    
    try {
        isLoading = true
        setButtonLoading(searchBtn,true)
        showSkeletonLoading(movieListEl)
        
        let apiURL = `https://www.omdbapi.com/?apikey=50a9856f&s=${encodeURIComponent(title)}`
        if (currentFilter) {
            apiURL += `&type=${currentFilter}`
        }

        const response = await fetch(apiURL)
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }
        
        const moviesData = await response.json()
        if (moviesData.Response === "True" && Array.isArray(moviesData.Search)) {
            displayMovies(moviesData.Search, movieListEl)
        } 
        else if (moviesData.Error) {
            movieListEl.innerHTML = `<div class="error__message">${moviesData.Error}</div>`
        }
        else {
            const filterText = currentFilter ? (currentFilter === 'movie' ? 'movies' : 'TV shows') : 'results'
            movieListEl.innerHTML = `<div class="no-results">No movies found. Please try a different search term.</div>`
        }
        
    } catch (error) {
        console.error('Search error:', error)
        movieListEl.innerHTML = `<div class="error__message">Something went wrong. Please check your connection and try again.</div>`
    } finally {
        isLoading = false
        setButtonLoading(searchBtn,false)
    }
}

function setButtonLoading(button, loading) {
    if (loading) {
        button.disabled = true
        button.innerHTML = '<div class="spinner"></div>'
    } else {
        button.disabled = false
        button.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`
    }
}

function showSkeletonLoading(container) {
    const skeletonHTML = Array(10).fill().map(() =>
        `<div class="skeleton-movie">
    <div class="skeleton skeleton-poster"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-year"></div>
    </div>`
).join('')

container.innerHTML = skeletonHTML
}

function displayMovies(movies, container) {
    container.innerHTML = movies.map(movie => {
        const badge = movie.Type === 'series' ?
        '<div class="badge__type series">TV Show</div>' : 
        '<div class="badge__type">Movie</div>'

        return `<div class="movie">
        ${badge}
        <figure class="poster">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" 
        alt="Image Not Found">
        </figure>
        <div class="title">${movie.Title}</div>
        <div class="year">${movie.Year}</div>
        </div>`
    }).join('')
}

document.getElementById('movieTitle').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        movieSearch()
    }
})