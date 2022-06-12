import { TheMovieApi } from './themovie-api';

const closeBtnEl = document.querySelector('.modal-close-icon');

const backdropEl = document.querySelector('.backdrop');
const modalHomeEl = document.querySelector('.modal-box');
const inModalEl = document.querySelector('.modal');

const sectionGalleryEl = document.querySelector('.film__list');

// Open modal

const onClickGallery = event => {
  backdropEl.classList.add('is-open');
  modalHomeEl.classList.add('is-open');

  closeBtnEl.addEventListener('click', onCloseModal);
  backdropEl.addEventListener('click', onClickBackdrop);

  const thisMovie = new TheMovieApi();
  const filmsFindEl = thisMovie.fetchTrendsFilms();

  const checkedItem = Number(event.target.id);

  console.log(event.path[1]);

  filmsFindEl.then(data => {
    const allFilms = data.data.results;
    const findFilms = allFilms.map(film => {
      if (film.id === checkedItem) {
        inModalEl.innerHTML = `<img class="modal-image" src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt=${film.original_title}>
            <div class="modal-descr">
                <h2 class="modal-descr__title">${film.title}</h2>
                <ul class="modal-descr__list">
    
                    <li class="modal-descr__item">
                        <p class="modal-descr__item-text">Vote / Votes</p>
                        <p class="modal-descr__item-value">
                            <span class="value-color vote js-vote">${film.vote_average}</span> /
                            <span class="value-color votes js-votes">${film.vote_count}</span>
                        </p>
                    </li>
    
                    </li>  
     
                    <li class="modal-descr__item">
                        <p class="modal-descr__item-text">Popularity</p> 
                        <p class="modal-descr__item-value js-popularity">${film.popularity}</p>
                    </li>
    
                    <li class="modal-descr__item">
                        <p class="modal-descr__item-text">Original Title</p>
                        <p class="modal-descr__item-value js-orig-title">${film.original_title}</p>
                    </li>
    
                    </li> 
     
                    
                    <li class="modal-descr__item">
                        <p class="modal-descr__item-text">Genre</p>
                        <p class="modal-descr__item-value js-genre">${film.genre_ids}</p>
                    </li>
    
                </ul>
    
                <p class="modal-about__title">About</p>
                <p class="modal-about-text js-text">${film.overview}</p>
            
                <div class="modal-btn-box">
                <button class="btn js-add-watched" type="button">add to Watched</button>
                <button class="btn btn-modal js-add-queue" type="button">add to queue</button>
                </div>
            
            </div>`;
      }
    });
    const btnWatchedEl = document.querySelector('.js-add-watched');
    const btnQueueEl = document.querySelector('.js-add-queue');

    const LOCAL_WATCHED = 'local-watched';
    const LOCAL_QUEUE = 'local-queue';

    const onClickWatched = event => {
      localStorage.setItem(LOCAL_WATCHED, checkedItem);
    };
    const onClickQueue = event => {
      localStorage.setItem(LOCAL_QUEUE, checkedItem);
    };

    btnWatchedEl.addEventListener('click', onClickWatched);
    btnQueueEl.addEventListener('click', onClickQueue);
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      return closeModal();
    }
  });
  return;
};

sectionGalleryEl.addEventListener('click', onClickGallery);

// Close modal

function closeModal() {
  backdropEl.classList.remove('is-open');
  modalHomeEl.classList.remove('is-open');

  closeBtnEl.removeEventListener('click', onCloseModal);
  backdropEl.removeEventListener('click', onClickBackdrop);

  btnWatchedEl.removeEventListener('click', onClickWatched);
  btnQueueEl.removeEventListener('click', onClickQueue);
}

const onCloseModal = event => {
  return closeModal();
};

const onClickBackdrop = event => {
  if (event.target.className === 'backdrop is-open') {
    return closeModal();
  }
  return;
};

// Local-storage
