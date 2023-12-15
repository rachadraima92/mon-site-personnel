// button toggler
const butoonToggler = document.querySelector('.button-toggler');
const nav = document.querySelector('.nav');

const toggleNav = () => {
    butoonToggler.classList.toggle('open');

    nav.classList.toggle('open');
}

butoonToggler.addEventListener('click', toggleNav) 

new ResizeObserver(entries => {
    if(entries[0].contentRect.width <= 800 ){
        nav.style.transition = "transform 0.3s ease-out"
    }else{
        nav.style.transition ="none"
    }
}).observe(document.body)