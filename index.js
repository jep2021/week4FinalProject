//api: https://www.omdbapi.com/?apikey=28916474&s=fast
//

const moviesListEl = document.querySelector(".movie-list");
const moviesLoading = document.querySelector(".movies__container");
const moviesRefresh = document.querySelector(".movie-list");
const searchResults = document.querySelector(".results__container");
let movies;



//search through the API with the value in the input text
function searchMovie(name) {
    const movieName = name.target.value;
    moviesListEl.innerHTML = refreshMovies();
    moviesLoading.classList += ' movies__loading'; //inject the loading state class 
    setTimeout(() => {
        getMovie(movieName);
    }, 1000);

    searchResults.innerHTML = `<h2>Search Results for: ${movieName} </h2>`
}

//gets the first 6 movies, given an input text for title
async function getMovie(name) {
    const moviesResult = await fetch(`https://www.omdbapi.com/?apikey=28916474&s=${name}`);
    const moviesData = await moviesResult.json();
    const selectBox = document.getElementById("filter");
    moviesLoading.classList.remove('movies__loading'); //delete loading state class after successfully retrieving the API call
    if(moviesData.Response === 'False') {
        selectBox.selectedIndex = 0;
        moviesListEl.innerHTML = `<h2>Sorry, there were no results related to the search: "${name}"</h2>`
        movies.splice(0);
    }
    else{
        const movieList = moviesData.Search.slice(0, 6);
        selectBox.selectedIndex = 0;
        movies = movieList;
        moviesListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
    }
    
}

//renders HTML movie cards for each movie
function movieHTML(movie) {
    return `<div class="movie-card">
    <div class="movie-card__container">
        <img src=${movie.Poster} width="300" height="400">   
        <h4>${movie.Title}</h4>
        <p>${movie.Year}<p>
      
    </div>
  </div>`
}

function filterMovies(event) {
    renderFilteredMovies(event.target.value);
}

function renderFilteredMovies(filter) {
    if(filter === 'Oldest') {
        const filteredMovies = movies.sort((a, b) => (a.Year) - (b.Year))
        movies = filteredMovies;

    }
    if(filter === 'Newest') {
        const filteredMovies = movies.sort((a, b) => (b.Year) - (a.Year))
        movies = filteredMovies;
    }
    moviesListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}


function refreshMovies() {
    return ``;
}