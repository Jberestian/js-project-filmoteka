import { TheMovieApi } from './themovie-api';
import { onClickGallery } from './modal-home';
// import { changeData } from '../index';

const containerEl = document.querySelector('.film__container');
const listEl = document.querySelector('.film__list');

const inputFormEl = document.querySelector('.js-search-form');
const errorEl = document.querySelector('header__input-error');

const theMovieApi = new TheMovieApi();
const filmsPromiseEl = theMovieApi.fetchTrendsFilms();
const filmsGenresEl = theMovieApi.fetchGenresFilms();
// const filmsSearchEl = theMovieApi.fetchSearchFilms();

const onSubmitSearchFilms = async event => {
  event.preventDefault();
  theMovieApi.fetchTrendsFilms().then(result => {
    const value = inputFormEl[0].value;
    theMovieApi.searchQuery = value;
    console.log('result.data.results :', result);
    console.log(' 123:', theMovieApi.searchQuery);

    trendsFilms(result.data.results);
  });

  console.dir(inputFormEl[0].value);
};

inputFormEl.addEventListener('input', onSubmitSearchFilms);

filmsPromiseEl.then(result => {
  const films = result.data.results;
  trendsFilms(films);
});

filmsGenresEl.then(response => {
  const genreResponse = response.data.genres;
  const genNameEl = genreResponse.map(genre => genre.name);
  const genIdEl = genreResponse.map(genre => genre.id);

  localStorage.setItem('id', genIdEl);
  localStorage.setItem('name', genNameEl);
});

const idOfFilms = localStorage.getItem('id').split(',');
const nameOfGenres = localStorage.getItem('name').split(',');

export function getNumberFilms(item) {
  const numbersId = idOfFilms.indexOf(`${item}`);
  return nameOfGenres[numbersId];
}

function trendsFilms(films) {
  const markupItems = films
    .map(film => {
      return `
        <li class="film__item" id="${film.id}">
          <img class="film__img" src="https://image.tmdb.org/t/p/w500/${
            film.poster_path
          }" alt=${film.original_title}>
          <h3 class="film__name">${film.title}</h3>
          <p class="film__genre">
            ${film.genre_ids.map(item => {
              item = getNumberFilms(item);
              return ` ${item}`;
            })}
            <span class="film__date-release">| ${film.release_date.slice(
              0,
              4
            )}</span>
          </p>
        </li>`;
    })
    .join('');
  listEl.insertAdjacentHTML('beforeend', markupItems);
  const filmsCheck = document.querySelectorAll('.film__item');
  filmsCheck.forEach(film => film.addEventListener('click', onClickGallery));
}
