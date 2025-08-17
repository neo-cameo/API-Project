
async function movieSearch() {
    const title = document.getElementById('movieTitle').value
    const moviesLoad = document.querySelector('.movies__list')

    moviesLoad.classList += ' movies__loading'

    if (!movies) {
            movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=50a9856f&s=${title}`);
     moviesData = await movies.json();
    movieListEl = document.querySelector(".movie__container")
    console.log(moviesData.Search)

    moviesLoad.classList.remove('movies__loading')

    if (moviesData.Response === "True" && Array.isArray(moviesData.Search)) {
        movieListEl.innerHTML =
          moviesData.Search.map(
            (movie) => `
                  <div class="movie">
                      <figure class="poster">
                          <img src="${movie.Poster}" alt="">
                      </figure>
                      <div class="title">${movie.Title}</div>
                      <div class="year">${movie.Year}</div>
                      </div>`
          )
          .join("")
          return
    }
    else {
        movieListEl.innerHTML = `<div>Make sure your spelling is correct and a title is in the search bar!</div>`
    }
    }
  
}

