import axios from 'axios';

export class TheMovieApi {
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #API_KEY = 'eed4f1d8aea9e26327c4f8a358313952';
  //   #API_IMG = 'https://image.tmdb.org/t/p/w500/';

  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchTrendsFilms() {
    return axios.get(
      `${this.#BASE_URL}trending/movie/day?api_key=${this.#API_KEY}`,
      {
        params: {
          page: this.page,
        },
      }
    );
  }

  fetchGenresFilms() {
    return axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=eed4f1d8aea9e26327c4f8a358313952&language=en-US`,
      {
        params: {
          name: this.name,
        },
      }
    );
  }

  fetchSearchFilms(query) {
    return axios.get(`${this.#BASE_URL}search/movie?api_key=${this.#API_KEY}`, {
      parems: {
        query: this.searchQuery,
        page: this.page,
      },
    });
  }
}
