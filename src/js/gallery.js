import { TheMovieApi } from './themovie-api';
import { onClickGallery } from './modal-home';
import { createPagination } from './pagination';

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

    if (data.total_pages === 0) {
      // errorEl.style.opacity = 1;
    } else {
      changeData(data).then(() => {
        listEl.innerHTML = markupItems(data.results);
        // errorEl.style.opacity = 0;
      });
    }
  } catch (err) {
    console.log(err);
  }

};

inputFormEl.addEventListener('input', onSubmitSearchFilms);

filmsPromiseEl.then(result => {
  const films = result.data.results;
  trendsFilms(films);
  // console.log(result);

  const pagination = createPagination({
    totalItems: result.data.total_results,
    totalPages: result.data.total_pages,
    page: result.data.page,
  });

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    // theMovieApi.page = currentPage;
    // theMovieApi.incrementPage();

    console.log(currentPage);
    theMovieApi
      .fetchTrendsFilms(event.page)
      .then(result => {
        trendsFilms(films);
        console.log(films);
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
