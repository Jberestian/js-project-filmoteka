import axios from 'axios';

export class TheMovieApi {
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #API_KEY = 'eed4f1d8aea9e26327c4f8a358313952';

  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchTrendsFilms(pages) {
    return axios.get(
      `${this.#BASE_URL}trending/movie/day?api_key=${this.#API_KEY}`,
      {
        params: {
          page: pages,
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
      params: {
        query: query,
        page: this.page,
      },
    });

  }
}
