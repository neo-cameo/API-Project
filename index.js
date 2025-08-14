

async function movieSearch() {
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=50a9856f&s=${input}`)
    const data = await response.json()
    console.log(data)

}

movieSearch()