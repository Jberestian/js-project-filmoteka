// FOR LIBRARY
import { TheMovieApi } from './themovie-api';
const listEl = document.querySelector('.film__list-lib');

const theMovieApi = new TheMovieApi();

const filmsPromiseElw = theMovieApi.fetchTrendsFilms();
const filmsPromiseElq = theMovieApi.fetchTrendsFilms();

const btnWatched = document.querySelector('#watched');
const btnQueue = document.querySelector('#queue');
const EMPTY = `<li>
<img src="https://acegif.com/wp-content/uploads/upgifsok/tumbleweed-acegif-31.gif">
<b>No films added :/</b>
</li>`

btnWatched.disabled = true;
showWatched();

btnWatched.addEventListener('click', ev=>{
    btnQueue.disabled = false;
    btnWatched.disabled = true;
    btnWatched.classList.add('active');
    btnQueue.classList.remove('active')
    showWatched();
});
btnQueue.addEventListener('click', ev=>{
    btnWatched.disabled = false;
    btnQueue.disabled = true;
    btnQueue.classList.add('active');
    btnWatched.classList.remove('active')
    showQueue();
})



function showWatched(){
    console.log('showing watched...');
    console.log(localStorage.getItem('local-watched'));
    filmsPromiseElw.then(result => {
        const films = result.data.results;
        trendsFilms(films, 'watched');
      });      
}
function showQueue(){
    console.log('showing queue...');
    console.log(localStorage.getItem('local-queue'));
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
                listEl.innerHTML = EMPTY;
                return;
            };
            if (localStorage.getItem(`local-${typeOfstorage}`).includes(film.id)) {
                return `
                    <li class="film__item">
                    <img class="film__img" src="https://image.tmdb.org/t/p/w500/${film.poster_path
                    }" alt=${film.original_title} id="${film.id}">
                    <h3 class="film__name">${film.title}</h3>
                    <p class="film__genre">
                    ${film.genre_ids}
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
}
