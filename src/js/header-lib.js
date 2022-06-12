// FOR LIBRARY
const btnWatched = document.querySelector('#watched');
const btnQueue = document.querySelector('#queue');
btnWatched.disabled = true;
btnWatched.addEventListener('click', ev=>{
    btnQueue.disabled = false;
    btnWatched.disabled = true;
    btnWatched.classList.add('active');
    btnQueue.classList.remove('active')
    showWatched();
});
btnQueue.addEventListener('click', ev=>{
    btnWatched.disabled = false;
    btnQueue.disabled = true;
    btnQueue.classList.add('active');
    btnWatched.classList.remove('active')
    showQueue();
})
function showWatched(){
    console.log('showing watched...');
}
function showQueue(){
    console.log('showing queue...');
}
