!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},c=e.parcelRequired7c6;null==c&&((c=function(e){if(e in t)return t[e].exports;if(e in n){var c=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,c.call(o.exports,o,o.exports),o.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},e.parcelRequired7c6=c);var o=c("8wLUa"),l=c("8S4BJ"),a=c("4z2ok"),i=(c("4z2ok"),a=c("4z2ok"),document.querySelector(".film__list-lib")),r=new(0,o.TheMovieApi),s=r.fetchTrendsFilms(),d=r.fetchTrendsFilms(),u=document.querySelector("#watched"),m=document.querySelector("#queue"),f=document.querySelector("#clear"),p=document.querySelector(".empty__bg");function v(){s.then((function(e){g(e.data.results,"watched")}))}function g(e,t){console.log(e),i.innerHTML="";var n=e.map((function(e){return null===JSON.parse(localStorage.getItem("local-".concat(t)))?(i.innerHTML="",void(p.style.display="block")):JSON.parse(localStorage.getItem("local-".concat(t))).includes(e.id)?(p.style.display="none",'\n                    <li class="film__item" id="'.concat(e.id,'">\n                    <img class="film__img" src="https://image.tmdb.org/t/p/w500/').concat(e.poster_path,'" alt=').concat(e.original_title,' id="').concat(e.id,'">\n                    <h3 class="film__name">').concat(e.title,'</h3>\n                    <p class="film__genre">\n                    ').concat(e.genre_ids.map((function(e){return e=(0,l.getNumberFilms)(e)," ".concat(e)})),'\n                    <span class="film__date-release">| ').concat(e.release_date.slice(0,4),'</span>\n                    <span class="film__rating">').concat(e.vote_average,"</span>\n                    </p>\n                    </li>")):void 0})).join("");i.insertAdjacentHTML("beforeend",n);var c=document.querySelectorAll(".film__item"),r=function(e){var t=document.querySelector(".modal-close-icon"),n=document.querySelector(".backdrop"),c=document.querySelector(".modal-box");n.classList.add("is-open"),c.classList.add("is-open"),t.addEventListener("click",a.onCloseModal),n.addEventListener("click",a.onClickBackdrop);var l=(new(0,o.TheMovieApi)).fetchTrendsFilms(),i=Number(e.currentTarget.id);l.then((function(e){console.log(e);var t=e.data.results;(0,a.searchFilmsFunction)(t,i)}))};c.forEach((function(e){return e.addEventListener("click",r)}))}u.disabled=!0,v(),u.addEventListener("click",(function(e){console.log("hhh"),m.disabled=!1,u.disabled=!0,m.classList.add("active"),u.classList.remove("active"),v()})),m.addEventListener("click",(function(e){u.disabled=!1,m.disabled=!0,u.classList.add("active"),m.classList.remove("active"),d.then((function(e){g(e.data.results,"queue")}))})),f.addEventListener("click",(function(e){localStorage.removeItem("local-watched"),localStorage.removeItem("local-queue"),i.innerHTML="",p.style.display="block"}))}();
//# sourceMappingURL=library.4fcaf130.js.map