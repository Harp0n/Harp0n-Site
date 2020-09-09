const menuBtn = document.querySelector('#menu--button');
const menuBtnBurgerLeft = menuBtn.querySelector('.menu__burger-btn-left');
const menuBtnBurgerRight = menuBtn.querySelector('.menu__burger-btn-right');

menuBtn.addEventListener('click', () => {
    menuBtnBurgerLeft.classList.toggle('open-left');
});

menuBtn.addEventListener('click', () => {
    menuBtnBurgerRight.classList.toggle('open-right');
});