import { TheMovieApi } from './js/themovie-api';

const theMovieApi = new TheMovieApi();

export function changeData(data) {
  return theMovieApi.fetchSearchFilms().then(() => {
    const getIds = localStorage.getItem('genre_ids');
    const parseIds = JSON.parse(getIds);

    data.results.forEach(el => {
      el.genre_ids.forEach((genre, ind, arr) => {
        for (let i = 0; i < parseIds.length; i += 1) {
          if (genre === parseIds[i].id) {
            arr[ind] = parseIds[i].name;
            break;
          }
        }
      });

      if (el.poster_path === null) {
        el.poster_path =
          'https://thumbs.dreamstime.com/b/%D1%81%D0%BA%D0%BE%D1%80%D0%BE-%D0%BD%D0%B0-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B4%D0%BE%D1%81%D0%BA%D0%B5-%D0%BF%D0%BE%D1%8F%D0%B2%D0%B8%D1%82%D1%81%D1%8F-%D0%BF%D0%BB%D0%B0%D0%BA%D0%B0%D1%82-retro-%D1%81%D0%B2%D0%B5%D1%82%D1%8F%D1%89%D0%B8%D0%B9%D1%81%D1%8F-%D0%BD%D0%B5%D0%BE%D0%BD-159994270.jpg';
      } else {
        el.poster_path = 'https://image.tmdb.org/t/p/w500/' + el.poster_path;
      }

      if (el.release_date) {
        el.release_date = el.release_date.slice(0, 4);
      } else {
        el.release_date = 'release year unknown';
      }

      if (!el.genre_ids.length) {
        el.genre_ids = 'genre unknown';
      }
    });
  });
}
