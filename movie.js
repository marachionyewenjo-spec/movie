const elements ={
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    resultGrid: document.getElementById('result')
}


let API_KEY = "7f0e1867";

async function fetchMovieData(query) {
    const get = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`);
    if(!get.ok) throw new Error("API Connection Failed");
    return await get.json();
}

function giveMovie(movie) {
    if(movie.Response === "False") {
        elements.resultGrid.innerHTML = `<p>Movie not available.</p>`;
        return;
    }
    
    elements.resultGrid.innerHTML = `
        <div class="card">
            <h3>${movie.Title} (${movie.Year})</h3>
            <img src="${movie.Poster}" alt="poster" />
            <p>${movie.Plot}</p>
            <span> Rating ⭐⭐⭐: ${movie.imdbRating} </span>
            <br>
            <a href="https://www.google.com/search?q=${encodeURIComponent(movie.Title)}"
            target="_blank" class="link">
            Learn more
            </a>
        </div>
    `;
}

elements.searchBtn.addEventListener('click', async () => {
    const query = elements.searchInput.value;
    if(!query) return;
    
    elements.resultGrid.innerHTML = "Loading...";
    
    try {
        const data = await fetchMovieData(query);
        giveMovie(data);
    } catch(err) {
        console.error(err);
        elements.resultGrid.innerHTML  = " Network Failure...";
    }
});