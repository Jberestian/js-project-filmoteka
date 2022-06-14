import Pagination from 'tui-pagination';
import TheMovieApi, { TheMovieApi } from './themovie-api';

const TheMovieApi = new TheMovieApi();

const container = document.querySelector('#pagination');

export const createPagination = ({ totalItems, totalPages, page } = {}) => {
  const options = {
    totalItems: 2000,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 2,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      disabledMoveButton(event) {
        if (event.type === 'first' || event.type === 'last') {
          return '<span></span>';
        }
        return `<span class="tui-page-btn tui-is-disabled tui-${event.type}"><span class="tui-ico-${event.type}">${event.type}</span></span>`;
      },
      moveButton(event) {
        if (event.type === 'first' || event.type === 'last') {
          return '<span></span>';
        }
        return `<a href="#" class="tui-page-btn tui-${event.type}"><span class="tui-ico-${event.type}">${event.type}</span></a>`;
      },
    },
  };
  const pagination = new Pagination(container, options);
  return pagination;
};
