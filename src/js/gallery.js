import { TheMovieApi } from './themovie-api';
import { onClickGallery } from './modal-home';
import { createPagination } from './pagination';
import { onClickSearch } from "./modal-home";

import Notiflix from 'notiflix';

const listEl = document.querySelector('.film__list');

const inputFormEl = document.querySelector('.js-search-form');


const theMovieApi = new TheMovieApi();
const filmsPromiseEl = theMovieApi.fetchTrendsFilms();
const filmsGenresEl = theMovieApi.fetchGenresFilms();

const onSubmitSearchFilms = event => {
  event.preventDefault();
  const clicks = document.querySelector('.header__logo')
  if (inputFormEl[0].value === '') {
    return clicks.click()
  }
  theMovieApi.fetchSearchFilms(inputFormEl[0].value).then(result => {

    if (result.data.total_results === 0) {
      listEl.innerHTML = ''
      Notiflix.Report.failure('Упс...', 'Ваш поиск не дал результатов. Такого фильма нет!', 'Обновить', function cb() {
        clicks.click()
      });
      return
    }
    listEl.innerHTML = ''
    trendsFilms(result.data);
    return
  });



};

inputFormEl.addEventListener('input', onSubmitSearchFilms);
export let numberPage = 1;


filmsPromiseEl.then(result => {
  const films = result.data;
  trendsFilms(films);

  const pagination = createPagination({
    totalItems: result.data.total_results,
    totalPages: result.data.total_pages,
    page: result.data.page,
  });

  pagination.on('afterMove', event => {
    let currentPage = event.page;
    numberPage = event.page;


    theMovieApi
    .fetchTrendsFilms(currentPage)
      .then(result => {
        const paginationFilms = result.data
        listEl.innerHTML = '';
        window.scrollTo(0, 0)
        trendsFilms(paginationFilms);
        return;
      })
      .catch(error => {
        console.log(error);
      });
  });
});

filmsGenresEl.then(response => {
  const genreResponse = response.data.genres;
  const genNameEl = genreResponse.map(genre => genre.name);
  const genIdEl = genreResponse.map(genre => genre.id);

  localStorage.setItem('id', genIdEl);
  localStorage.setItem('name', genNameEl);
});


export function getNumberFilms(item) {
  const idOfFilms = localStorage.getItem('id').split(',');
  const nameOfGenres = localStorage.getItem('name').split(',');

  const numbersId = idOfFilms.indexOf(`${item}`);
  return nameOfGenres[numbersId];
}

function trendsFilms(films) {
  console.log(films);
  if (films.total_results === 20000) {
    films = films.results
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
  return films
  }
  else {
    films = films.results
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
  const searchCheck = document.querySelectorAll('.film__item');
  searchCheck.forEach(film => film.addEventListener('click', onClickSearch));
  return films
  }
}
