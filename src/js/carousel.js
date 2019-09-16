//carousal
const track = document.querySelector('.home__track-list');
//left click
//riht click
//nav indicators click

const slides = Array.from(track.children);
const nextButton = document.querySelector('.home__btn--right');
const prevButton = document.querySelector('.home__btn--left');
const dotsNav = document.querySelector('.home__nav-container');
const dots = Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

//arranging slides next to each other
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('home__current-slide');
    targetSlide.classList.add('home__current-slide');
}

//right click
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.home__current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.home__current-btn');
    let nextDot = currentDot.nextElementSibling;
    //move to the next slide
    if (nextSlide === null) {
        nextSlide = slides[0];
        nextDot = dots[0];
    }
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
})

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.home__current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.home__current-btn');
    let prevDot = currentDot.previousElementSibling;
    //move to the prev slide
    if (prevSlide === null) {
        prevSlide = slides[slides.length - 1];
        prevDot = dots[dots.length - 1];
    }
    moveToSlide(track, currentSlide, prevSlide);

    updateDots(currentDot, prevDot);
})

//on clicking indicators
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.home__current-slide');
    const currentDot = dotsNav.querySelector('.home__current-btn');

    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('home__current-btn');
    targetDot.classList.add('home__current-btn');
}