// FOR SEARCH
const input = document.querySelector('.header__input');
import { TheMovieApi } from './themovie-api';

input.addEventListener("input", (event) => {
    renderSearch(event.currentTarget.value);
  });

function renderSearch(el) {
    console.log(el);
}

const containerEl = document.querySelector('.film__container');
const listEl = document.querySelector('.film__list');
const theMovieApi = new TheMovieApi();

const filmsPromiseEl = theMovieApi.fetchTrendsFilms();

filmsPromiseEl.then(result => {
  const films = result.data.results;
  trendsFilms(films);
});

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
