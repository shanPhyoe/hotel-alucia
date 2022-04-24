// MENU BUTTON FUNCTIONING
const navigation = document.getElementById('navigation');
const menu = document.getElementById('menu');
const menuLink = document.querySelectorAll('.menu__link');
const wrapper = document.getElementById('wrapper');

const menuFunctionality = function () {
    navigation.classList.toggle('navigation--inverted');
    wrapper.classList.toggle('wrapper--inverted');
    menu.classList.toggle('menu--active');

    if (!menu.classList.contains('menu--active')) {
        menuLink.forEach(link => {
            link.style.opacity = 0;
        });
    } else {
        menuLink.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = 1;
            }, 1000 + index * 400);
        });
    }
};

navigation.addEventListener('click', function (e) {
    const menuButton = e.target.closest('.navigation__menu');
    if (!menuButton) return;

    menuFunctionality();
});

menuLink.forEach(link => {
    link.addEventListener('click', () => {
        menuFunctionality();
    });
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

// percentage of value calculated
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
// HEADING BUTTON SCROLLING
const headerButton = document.getElementById('header-button');
const rooms = document.getElementById('rooms');

headerButton.addEventListener('click', function () {
    rooms.scrollIntoView({ behavior: 'smooth' });
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
// helper function
// adding active class to only one certain element of same elements type depending on index
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
// ICON ANIMATION
const servicesIconBoxes = document.querySelectorAll('.services__content');

servicesIconBoxes.forEach(box => {
    box.addEventListener('mouseenter', function () {
        box.classList.add('services__icon--active');

        // 800ms is rotate-transition
        setTimeout(() => {
            box.classList.remove('services__icon--active');
        }, 800);
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

// -------------------------------------------------------------------- //
//SECTIONS REVEAL
const sectionS = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
    const entry = entries[0];

    //safeguard
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    //unobserve after revealing
    observer.unobserve(entry.target);
};

const revealObserverOption = {
    root: null,
    threshold: 0.2,
};
const sectionObserver = new IntersectionObserver(
    revealSection,
    revealObserverOption
);
sectionS.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// -------------------------------------------------------------------- //

window.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM fully loaded');

    createDots();
    setActiveElement(currentSlide, 'dots__dot');
    setActiveElement(currentSlide, 'slide');

    setActiveElement(currentFeaturedBox, 'feature-box__images-box');
    setActiveElement(currentFeaturedBox, 'feature-box__label');
    setActiveElement(currentFeaturedBox, 'feature-box__text-box');
});

// -------------------------------------------------------------------- //
