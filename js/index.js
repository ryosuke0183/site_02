window.addEventListener('DOMContentLoaded', function () {
    const HAMBURGER = document.querySelector('.hamburger');
    const NAV = document.querySelector('.nav');
    HAMBURGER.addEventListener('click', function () {
        HAMBURGER.classList.toggle('js_clicked');
        NAV.classList.toggle('js_clicked');
    });

    // circle text
    const CIRCLE_TEXT = document.querySelector('.circle-text__text');
    const CIRCLE_TEXT_ARRAY = CIRCLE_TEXT.textContent.split('');
    const CIRCLE_TEXT_LEN = CIRCLE_TEXT_ARRAY.length;
    const DEG = 360 / CIRCLE_TEXT_LEN;

    CIRCLE_TEXT.textContent = '';

    CIRCLE_TEXT_ARRAY.forEach(function (text, index) {
        let span = document.createElement('span');
        span.textContent = text;
        span.style.transform = `rotate(${DEG * index}deg)`;
        CIRCLE_TEXT.appendChild(span);
    });

    CIRCLE_TEXT.animate(
        [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' },
        ],
        {
            duration: 50000,
            easing: 'linear',
            iterations: Infinity,
        }
    );

    // // slider
    // $('.shop__slider-lists').slick({
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-circle-arrow-left"></i></button>',
    //     nextArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-circle-arrow-right"></i></button>',
    // });

});

function setTranslateValue() {
    let translateXValue;
    if(window.matchMedia('(min-width: 576px)').matches) {
        translateXValue = 460;
    }else {
        translateXValue = 300;        
    }

    return translateXValue;
}

window.addEventListener('DOMContentLoaded', function() {
    const SLIDER_SELECTOR = '.shop__slider';
    
    const SLIDER = document.querySelector(`${SLIDER_SELECTOR}`);
    SLIDER.classList.add('slider');
    
    const SLIDER_LISTS = SLIDER.querySelector(':first-child');
    SLIDER_LISTS.classList.add('slider__lists');
    
    const SLIDER_LIST = SLIDER.querySelectorAll(".slider__lists > *");
    SLIDER_LIST.forEach(function (slider, index) {
        if (index === 0) {
            slider.classList.add('current');
        }
        
        slider.classList.add('slider__list');
        slider.dataset.index = index;
    });
    
    const SLIDER_ARROW_LEFT = document.querySelector('.shop__arrow-left');
    const SLIDER_ARROW_RIGHT = document.querySelector('.shop__arrow-right');
    
    let translateXValue = setTranslateValue();
    window.addEventListener('resize', function() {
        translateXValue = setTranslateValue();
    })
    
    SLIDER_ARROW_LEFT.addEventListener('click', function () {
        let currentSlide = SLIDER_LISTS.querySelector('.current');
        
        // 左端に位置していた時
        if (Number(currentSlide.dataset.index) === 0) {
            return;
        }
        
        let currentSlideIndex = Number(currentSlide.dataset.index);
        currentSlide.classList.remove('current');
        
        let beforeSlide = document.querySelector(`.slider li[data-index="${currentSlideIndex - 1}"]`);
        beforeSlide.classList.add('current');
    
        let translateX = translateXValue * Number(beforeSlide.dataset.index);
        SLIDER.style.transform = `translateX(-${translateX}px)`;
    })
    
    SLIDER_ARROW_RIGHT.addEventListener('click', function () {
        let currentSlide = SLIDER_LISTS.querySelector('.slider .current');
        if (SLIDER_LIST.length === Number(currentSlide.dataset.index) + 1) {
            return;
        }
        
        let currentSlideIndex = Number(currentSlide.dataset.index);
        currentSlide.classList.remove('current');
        
        let nextSlide = document.querySelector(`.slider li[data-index="${currentSlideIndex + 1}"]`);
        nextSlide.classList.add('current');
        
        let translateX = translateXValue * Number(nextSlide.dataset.index);
        SLIDER.style.transform = `translateX(-${translateX}px)`;
    })
});
