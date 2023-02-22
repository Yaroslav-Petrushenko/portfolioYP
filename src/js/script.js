//hamburger
let hamburger = document.querySelector(".hamburger");
let nmenu = document.querySelector(".nav-menu");
hamburger.onclick = function () {
    nmenu.classList.toggle("active-burger");
}
const headerSection = document.querySelector('.header-section');
let lastScrollTop = 0;

function menuBackground() {
    let scrltop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrltop > lastScrollTop) {
        headerSection.classList.add("headerHid");
    } else {
        headerSection.classList.remove("headerHid");
        nmenu.classList.remove("active-burger");
    }
    lastScrollTop = scrltop <= 0 ? 0 : scrltop;

    if (window.pageYOffset > (window.innerHeight / 4)) {
        headerSection.style.background = "linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45))";
    } else {
        headerSection.style.background = "transparent";
    }
}
window.addEventListener(`scroll`, menuBackground);

//scroll
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = link.getAttribute('href');

        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// scroll top

window.addEventListener('scroll', function () {
    let btnTop = document.getElementById('scrolTop');

    if (window.pageYOffset > 400) {
        btnTop.classList.add('show');
    } else {
        btnTop.classList.remove('show');
    }
});

document.getElementById('scrolTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
