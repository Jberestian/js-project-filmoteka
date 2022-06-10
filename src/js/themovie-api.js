// import axios from 'axios';

// export class TheMovieApi {
//   #BASE_URL = 'https://api.themoviedb.org/3/movie/76341';
//   #API_KEY = 'eed4f1d8aea9e26327c4f8a358313952';

//   constructor(){}

//   fetchFilms(){

//   }

// }

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'eed4f1d8aea9e26327c4f8a358313952';

export const movieApi = () => {
  return fetch(`${BASE_URL}movie/76341?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(response);

    return response.json();
  });
};
