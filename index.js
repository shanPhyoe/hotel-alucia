// MENU BUTTON FUNCTIONING

const navigation = document.getElementById('navigation');
const wrapper = document.getElementById('wrapper');

navigation.addEventListener('click', function (e) {
    const menu = e.target.closest('.navigation__menu');
    if (!menu) return;
    navigation.classList.toggle('navigation--inverted');
    wrapper.classList.toggle('wrapper--inverted');
});

// -------------------------------------------------------------------- //
// HEADING PRIMARY PARALLAX
const header = document.getElementById('header');
const layerOne = document.getElementById('layer-1');
const layerTwo = document.getElementById('layer-2');
const layerThree = document.getElementById('layer-3');
const layerFour = document.getElementById('layer-4');
const layerFive = document.getElementById('layer-5');
const layerSix = document.getElementById('layer-6');

// the smaller the multiplier, the smaller distance the element will move
const parallaxMultiplierOne = 0.01;
const parallaxMultiplierTwo = 0.02;
const parallaxMultiplierThree = 0.04;

header.addEventListener('mousemove', function (e) {
    const pageX = e.clientX - window.innerWidth / 2;
    const pageY = e.clientY - window.innerHeight / 2;

    layerOne.style.transform = `translate(${
        20 - pageX * parallaxMultiplierThree
    }%, ${20 - pageY * parallaxMultiplierThree}%)`;

    layerTwo.style.transform = `translate(${
        20 - pageX * parallaxMultiplierOne
    }%, ${20 - pageY * parallaxMultiplierOne}%)`;

    layerThree.style.transform = `translate(${
        20 - pageX * parallaxMultiplierThree
    }%, ${20 - pageY * parallaxMultiplierThree}%)`;

    layerFour.style.transform = `translate(${
        20 - pageX * parallaxMultiplierTwo
    }%, ${20 - pageY * parallaxMultiplierTwo}%)`;

    layerFive.style.transform = `translate(${
        20 - pageX * parallaxMultiplierTwo
    }%, ${20 - pageY * parallaxMultiplierTwo}%)`;

    layerSix.style.transform = `translate(${
        20 - pageX * parallaxMultiplierThree
    }%, ${20 - pageY * parallaxMultiplierThree}%)`;
});

// -------------------------------------------------------------------- //
// ABOUT SECTION PARALLAX
const sectionAbout = document.getElementById('about');
const parallaxImgOne = document.getElementById('parallax-img-1');
const parallaxImgTwo = document.getElementById('parallax-img-2');
const parallaxImgThree = document.getElementById('parallax-img-3');

const imageParallaxFunctionality = function () {
    const yValueOne = sectionAbout.getBoundingClientRect().top / 40;
    const yValueTwo = sectionAbout.getBoundingClientRect().top / 20;

    parallaxImgOne.style.transform = `translate3d(0, ${yValueOne}rem, 0)`;
    parallaxImgTwo.style.transform = `translate3d(0, ${yValueOne}rem, 0)`;
    parallaxImgThree.style.transform = `translate3d(0, ${yValueTwo}rem, 0)`;
};

const imageParallax = function (entries) {
    const [entry] = entries;

    if (entry.isIntersecting) {
        wrapper.addEventListener('scroll', imageParallaxFunctionality);
    } else {
        wrapper.removeEventListener('scroll', imageParallaxFunctionality);
    }
};

// here, used scroll event listener altogether with sectionObserver to optimize performance
const obsOption = {
    root: null,
    threshold: 0,
};
const sectionAboutObserver = new IntersectionObserver(imageParallax, obsOption);
sectionAboutObserver.observe(sectionAbout);

// -------------------------------------------------------------------- //
// adding active class to only one certain element of same elements type
const setActiveElement = function (index, elementClassName, delay = 0) {
    const elements = document.querySelectorAll(`.${elementClassName}`);

    elements.forEach(element => {
        element.classList.remove(`${elementClassName}--active`);
    });

    setTimeout(() => {
        document.querySelector(`.${elementClassName}[data-key="${index}"]`)
            ? document
                  .querySelector(`.${elementClassName}[data-key="${index}"]`)
                  .classList.add(`${elementClassName}--active`)
            : elements[index].classList.add(`${elementClassName}--active`);
    }, delay);
};

// -------------------------------------------------------------------- //
// ROOMS SECTION SLIDES FUNCTIONALITY
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

// manually creating dots based on number of slide
const createDots = function () {
    slides.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="dots__dot" data-key=${i}></div>`
        );
    });
};

let currentSlide = 0;
const lastSlide = slides.length - 1;
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const nextSlide = function () {
    if (currentSlide >= lastSlide) currentSlide = 0;
    else currentSlide++;

    setActiveElement(currentSlide, 'slide');
    setActiveElement(currentSlide, 'dots__dot');
};

const prevSlide = function () {
    if (currentSlide <= 0) currentSlide = lastSlide;
    else currentSlide--;

    setActiveElement(currentSlide, 'slide');
    setActiveElement(currentSlide, 'dots__dot');
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
        currentSlide = e.target.dataset.key;
        setActiveElement(e.target.dataset.key, 'dots__dot');
        setActiveElement(e.target.dataset.key, 'slide');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    createDots();
    setActiveElement(currentSlide, 'dots__dot');
    setActiveElement(currentSlide, 'slide');
});

// -------------------------------------------------------------------- //
// FEATURE BOXES FUNCTIONALITY
const featuredImgBoxes = document.querySelectorAll('.feature-box__images-box');
const featuredTextBoxes = document.querySelectorAll('.feature-box__text-box');
const featuredLabels = document.querySelectorAll('.feature-box__label');
let currentFeaturedBox = 0;

const removeInactive = function () {
    featuredImgBoxes.forEach(box => {
        box.classList.remove(`feature-box__images-box--inactive`);
    });
    featuredTextBoxes.forEach(box => {
        box.classList.remove(`feature-box__text-box--inactive`);
    });
    featuredLabels.forEach(label => (label.style.pointerEvents = `auto`));
};

featuredLabels.forEach(label => {
    label.addEventListener('click', () => {
        if (label.classList.contains('feature-box__label--active')) return;

        featuredImgBoxes[currentFeaturedBox].classList.add(
            'feature-box__images-box--inactive'
        );
        featuredTextBoxes[currentFeaturedBox].classList.add(
            'feature-box__text-box--inactive'
        );

        // 900ms is css animation time
        setTimeout(removeInactive, 900);

        const activeIndex = label.dataset.key;
        setActiveElement(activeIndex, 'feature-box__images-box');
        setActiveElement(activeIndex, 'feature-box__label');
        setActiveElement(activeIndex, 'feature-box__text-box');
        currentFeaturedBox = activeIndex;
    });
});

// -------------------------------------------------------------------- //
// FORM LABEL WAVE ANIMATION
const formLabels = document.querySelectorAll('.form__label');

formLabels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, i) => {
            return `<span style="transition-delay:${
                i * 50
            }ms">${letter}</span>`;
        })
        .join('');
});
