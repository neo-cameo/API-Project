// const movieTitle = document.getElementById('movieTitle')
// movieTitle.addEventListener('keyup', e => {
//     let currentValue = e.target.value.toLowerCase()
//     console.log(currentValue)
// })

async function movieSearch() {
  const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=50a9856f&s=soldier`);
  const moviesData = await movies.json();
    movieListEl = document.querySelector(".movie")
    console.log(moviesData.Search)

  movieListEl.innerHTML =
    moviesData.Search.map(
      (movie) => `<figure class="poster">
                    <img src="${movie.Poster}" alt="">
                </figure>
                <div class="title">${movie.Title}</div>
                <div class="year">${movie.Year}</div>`
    )
    .join("")
}

movieSearch();
