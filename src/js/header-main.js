// FOR SEARCH
const input = document.querySelector('.header__input');

input.addEventListener("input", (event) => {
    renderSearch(event.currentTarget.value);
  });

function renderSearch(el){
    console.log(el);
}