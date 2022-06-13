import { TheMovieApi } from './themovie-api';

const containerEl = document.querySelector('.film__container');
const listEl = document.querySelector('.film__list');
const inputFormEl = document.querySelector('.js-search-form');
const errorEl = document.querySelector('header__input-error');

const theMovieApi = new TheMovieApi();
const filmsPromiseEl = theMovieApi.fetchTrendsFilms();
const filmsGenresEl = theMovieApi.fetchGenresFilms();

const searchFilmsel = theMovieApi.fetchSearchFilms();



// let movieId = [];

// function setGenres() {
//   let filmsGenres = theMovieApi
//     .fetchGenresFilms()

//     .then(id => {
//       return (movieId = id.genres);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
// setGenres();

filmsPromiseEl.then(result => {
  const films = result.data.results;
  trendsFilms(films);
});

// filmsGenresEl.then(response => {
//   const genreResponse = response.data.genres;
//   const genNameEl = genreResponse.map(genre => genre.name);
//   const genIdEl = genreResponse.map(genre => genre.id);

//   console.log(genNameEl);
//   console.log(genIdEl);
//   localStorage.setItem(genIdEl, genNameEl);
// });

function recievedGenres(genIdEl) {
    // console.log(genNameEl);
    // console.log(genIdEl);

}

// let movieGenre = movieId
//   .filter(genre => genre_ids.includes(genre.id))
//   .map(genre => genre.name)
//   .join(', ');

function trendsFilms(films) {
    

  const markupItems = films
    .map(film => {
      return `
        <li class="film__item">
          <img class="film__img" src="https://image.tmdb.org/t/p/w500/${
            film.poster_path
          }" alt=${film.original_title} id="${film.id}">
          <h3 class="film__name">${film.title}</h3>
          <p class="film__genre">
            ${film.genre_ids}
            <span class="film__date-release">| ${film.release_date.slice(
              0,
              4
            )}</span>
          </p>
        </li>`;
    })
    .join('');
  listEl.insertAdjacentHTML('beforeend', markupItems);
}
