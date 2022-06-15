import { closeModal } from "./modal-home";
import Notiflix from 'notiflix';


let idFilmsWatched = [];
let idFilmsQueue = [];

    const LOCAL_WATCHED = 'local-watched';
    const LOCAL_QUEUE = 'local-queue';

export function onWatchedClick(checkedItem) {
    const btnWatchedEl = document.querySelector('.js-add-watched');
    const onClickModal = document.querySelector('.film__item')
    
    if (localStorage.getItem(LOCAL_WATCHED) === null) {
        btnWatchedEl.classList.remove('remove-btn')
      const onNullWatched = event => {
        idFilmsWatched.push(checkedItem);
        localStorage.setItem(LOCAL_WATCHED, JSON.stringify(idFilmsWatched));
        btnWatchedEl.removeEventListener('click', onNullWatched);
        Notiflix.Report.success('Класс!', 'Вы добавили фильм в библиотеку, раздел Watched!', 'Продолжить');
        return closeModal()
      };
btnWatchedEl.addEventListener('click', onNullWatched);
      
      }

      else if (!localStorage.getItem(LOCAL_WATCHED).includes(checkedItem)) {
        btnWatchedEl.classList.remove('remove-btn')

        const onClickWatched = event => {
            idFilmsWatched = JSON.parse([localStorage.getItem('local-watched')])
            idFilmsWatched.push(checkedItem);
            localStorage.setItem(LOCAL_WATCHED, JSON.stringify(idFilmsWatched));
            btnWatchedEl.removeEventListener('click', onClickWatched);
            Notiflix.Report.success('Класс!', 'Вы добавили фильм в библиотеку, раздел Watched!', 'Продолжить');
            return closeModal()
        }
btnWatchedEl.addEventListener('click', onClickWatched);
        
      }

      else if (localStorage.getItem(LOCAL_WATCHED).includes(checkedItem)) {
        btnWatchedEl.textContent = 'Remove from Watched';
        btnWatchedEl.classList.add('remove-btn')
        const btnWatchedRemove = document.querySelector('.remove-btn')

          const onRemoveWatched = event => {
          idFilmsWatched = JSON.parse(localStorage.getItem(LOCAL_WATCHED));
          const indexOfWatched =  idFilmsWatched.indexOf(checkedItem);
          idFilmsWatched.splice(indexOfWatched, 1)
          localStorage.setItem(LOCAL_WATCHED, JSON.stringify(idFilmsWatched))
          btnWatchedEl.removeEventListener('click', onRemoveWatched);
          Notiflix.Report.warning('Оу!', 'Вы удалили фильм из библиотеки, раздел Watched!', 'Продолжить');
          return closeModal()

          }
btnWatchedEl.addEventListener('click', onRemoveWatched);
          
      }
}

export function onQueueClick(checkedItem) {
    const btnQueueEl = document.querySelector('.js-add-queue');

    if (localStorage.getItem(LOCAL_QUEUE) === null) {
        btnQueueEl.classList.remove('remove-btn')
        const onClickQueue = event => {
          idFilmsQueue.push(checkedItem);
          localStorage.setItem(LOCAL_QUEUE, JSON.stringify(idFilmsQueue));
          btnQueueEl.removeEventListener('click', onClickQueue);
          Notiflix.Report.success('Класс!', 'Вы добавили фильм в библиотеку, раздел Queue!', 'Продолжить');
          return closeModal()
        };
    btnQueueEl.addEventListener('click', onClickQueue);
    
      }

    else if (!localStorage.getItem(LOCAL_QUEUE).includes(checkedItem)) {
        btnQueueEl.classList.remove('remove-btn')
        const onClickQueue = event => {
            idFilmsQueue = JSON.parse([localStorage.getItem('local-queue')])
            idFilmsQueue.push(checkedItem);
            localStorage.setItem(LOCAL_QUEUE, JSON.stringify(idFilmsQueue));
            btnQueueEl.removeEventListener('click', onClickQueue);
            Notiflix.Report.success('Класс!', 'Вы добавили фильм в библиотеку, раздел Queue!', 'Продолжить');
            return closeModal()
        }
btnQueueEl.addEventListener('click', onClickQueue);

      }

      else if (localStorage.getItem(LOCAL_QUEUE).includes(checkedItem)) {
        btnQueueEl.textContent = 'Remove from Queue';
        btnQueueEl.classList.add('remove-btn')
        
        const onRemoveQueue = event => {

        idFilmsQueue = JSON.parse(localStorage.getItem(LOCAL_QUEUE));
          const indexOfWatched =  idFilmsQueue.indexOf(checkedItem);
          idFilmsQueue.splice(indexOfWatched, 1)

          localStorage.setItem(LOCAL_QUEUE, JSON.stringify(idFilmsQueue))
          btnQueueEl.removeEventListener('click', onRemoveQueue);
          Notiflix.Report.warning('Оу!', 'Вы удалили фильм из библиотеки, раздел Queue!', 'Продолжить');
          return closeModal()
        }
btnQueueEl.addEventListener('click', onRemoveQueue);

      }

}