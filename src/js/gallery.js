import { TheMovieApi } from './themovie-api';

const containerEl = document.querySelector('.film__container');
const listEl = document.querySelector('.film__list');

const theMovieApi = new TheMovieApi();

const filmsPromiseEl = theMovieApi.fetchTrendsFilms();

// let movieId = [];

function setGenres() {
  let filmsGenres = theMovieApi
    .fetchGenresFilms()

    .then(id => {
      return (movieId = id.genres);
    })
    .catch(err => {
      console.log(err);
    });
}
setGenres();

filmsPromiseEl.then(result => {
  const films = result.data.results;
  trendsFilms(films);

  // console.log(films);
});

function trendsFilms(films) {
  // let movieGenre = movieId
  // .filter((genre) => genre_ids.includes(genre.id))
  // .map((genre) => genre.name)
  // .join(", ");

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
