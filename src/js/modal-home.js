'use strict'

const btnWatchedEl = document.querySelector('.js-add-watched');
const btnQueueEl = document.querySelector('.js-add-queue');
const closeBtnEl = document.querySelector('.modal-close-icon')

const backdropEl = document.querySelector('.backdrop');
const modalHomeEl = document.querySelector('.modal-box');

const sectionGalleryEl = document.querySelector('.fifm__section');

// Open modal

const onClickGallery = event => {
    backdropEl.classList.add('is-open');
    modalHomeEl.classList.add('is-open');

    closeBtnEl.addEventListener('click', onCloseModal);
    backdropEl.addEventListener('click', onClickBackdrop);

    btnWatchedEl.addEventListener('click', onClickWatched);
    btnQueueEl.addEventListener('click', onClickQueue);

    
    document.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
           return closeModal()
        }});
    return
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
  return  closeModal()
}



const onClickBackdrop = event => {

    if (event.target.className === "backdrop is-open") {
        return  closeModal()
    }
  return
}

// Local-storage

const LOCAL_WATCHED = "local-watched";
const LOCAL_QUEUE = "local-queue";

const onClickWatched = event => {
    localStorage.setItem(LOCAL_WATCHED, JSON.stringify(modalHomeEl.innerHTML));
}
const onClickQueue = event => {
    localStorage.setItem(LOCAL_QUEUE, JSON.stringify(modalHomeEl.innerHTML));
}


