// FOR LIBRARY
import { TheMovieApi } from './themovie-api';
import { getNumberFilms } from "./gallery";
import { onClickGallery } from "./modal-home";

const listEl = document.querySelector('.film__list-lib');

const theMovieApi = new TheMovieApi();

const filmsPromiseElw = theMovieApi.fetchTrendsFilms();
const filmsPromiseElq = theMovieApi.fetchTrendsFilms();

const btnWatched = document.querySelector('#watched');
const btnQueue = document.querySelector('#queue');
const btnClear = document.querySelector('#clear');
const emptyTurn = document.querySelector('.empty__bg');

btnWatched.disabled = true;
showWatched();

btnWatched.addEventListener('click', ev=>{
    btnQueue.disabled = false;
    btnWatched.disabled = true;
    btnQueue.classList.add('active');
    btnWatched.classList.remove('active')
    showWatched();
});
btnQueue.addEventListener('click', ev=>{
    btnWatched.disabled = false;
    btnQueue.disabled = true;
    btnWatched.classList.add('active');
    btnQueue.classList.remove('active')
    showQueue();
})
btnClear.addEventListener('click', e=>{
    localStorage.clear('local-watched');
    localStorage.clear('local-queue');
    listEl.innerHTML = '';
    emptyTurn.style.display = 'block'
})


function showWatched(){
    filmsPromiseElw.then(result => {
        const films = result.data.results;
        trendsFilms(films, 'watched');
      });      
}
function showQueue(){
    filmsPromiseElq.then(result => {
        const films = result.data.results;
        trendsFilms(films, 'queue');
      });
}

function trendsFilms(films, typeOfstorage) {
    listEl.innerHTML = '';
    const markupItems = films
        .map(film => {
            if (localStorage.getItem('local-queue') == null) {
                listEl.innerHTML = '';
                emptyTurn.style.display = 'block'
                return;
            };
            if (localStorage.getItem(`local-${typeOfstorage}`).includes(film.id)) {
                emptyTurn.style.display = 'none'
                return `
                    <li class="film__item" id="${film.id}">
                    <img class="film__img" src="https://image.tmdb.org/t/p/w500/${film.poster_path
                    }" alt=${film.original_title} id="${film.id}">
                    <h3 class="film__name">${film.title}</h3>
                    <p class="film__genre">
                    ${film.genre_ids.map(item => {
                        item = getNumberFilms(item)
                        return` ${item}`
                       })}
                    <span class="film__date-release">| ${film.release_date.slice(
                    0,
                    4
                    )}</span>
                    <span class="film__rating">${film.vote_average}</span>
                    </p>
                    </li>`;
                }
        })
    .join('');
  listEl.insertAdjacentHTML('beforeend', markupItems);
  const filmsChecks = document.querySelectorAll('.film__item')
  filmsChecks.forEach(film => film.addEventListener('click', onClickGallery))
}
