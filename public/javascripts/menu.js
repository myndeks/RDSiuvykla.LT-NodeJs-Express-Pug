// Global Variables
const myLikns  = document.getElementById("links");
const nav = document.getElementById('nav-container');
const btn = document.getElementById('hamburger-btn');

// Function for toogleMenu
const toogleMenu = () => {

    if (nav.offsetHeight === 0) {
        nav.style.transition = 'height 1s';
        btn.style.transform = 'rotate(180deg)';
        nav.style.height = '250px';
    } else {
        nav.style.transition = 'height 1s';
        btn.style.transform = 'rotate(360deg)';
        nav.style.height = '0';
    }

}

// AddEventListener for toogle menu
btn.addEventListener('click', () => {
    toogleMenu();
});

