import { Component } from '../component.js';

const slides = [
  {
    title: 'Просто снижаем цены',
    subtitle: 'На гигабайты и минуты',
    img: 'icons/snizhaen_tseni_desc.png',
    alt: 'Hand',
  },
  {
    title: 'Подключи Максимум',
    subtitle: 'Всего 1000 ₽ за 3 месяца с Абонементом',
    img: 'icons/podkluchi_maximum_desc.png',
    alt: 'Maximum',
  },
  {
    title: 'Подключай eSIM вместе с Yota',
    subtitle: 'Подключай Yota и будь на связи',
    img: 'icons/esim_banner_d.png',
    alt: 'eSIM',
  },
  {
    title: 'Играешь? Подключай!',
    subtitle: 'Начисляем игровую валюту каждый месяц',
    img: 'icons/gamebox_desc.png',
    alt: 'Gamepad',
  },
  {
    title: 'Сим-карта за 30 минут',
    subtitle: 'Бесплатная доставка от Самоката',
    img: 'icons/samokat_d.svg.png',
    alt: '30 минут',
  },
];

export class Carousel extends Component {
  constructor() {
    super();
    this.state = { current: 0, prev: 0, direction: 1 };
    this.timer = null;
    this.isSliding = false;
    // Create the main structure once
    this.el.className = 'yota-carousel mb-5';
    this.el.innerHTML = `
      <style>
        .yota-carousel {
            position: relative; /* Make this the positioning context for absolute children */
        }
        .carousel-slide-viewport { 
          overflow: hidden; 
          border-radius: 2rem;
          position: relative;
        }
        .carousel-slide-wrapper { 
          display: flex; 
          width: 100%; /* Start with 100%, will change during transition */
          transition: transform 0.5s cubic-bezier(.4,0,.2,1);
          position: relative;
        }
        .carousel-slide { 
          width: 100%; 
          flex-shrink: 0; 
          opacity: 1; 
          position: relative;
        }
        /* Make arrows visible on hover over the main carousel container */
        .yota-carousel:hover .carousel-arrow { 
            opacity: 1 !important; 
            pointer-events: auto; 
        }
        .carousel-arrow { 
          opacity: 0; 
          pointer-events: none; 
          transition: opacity 0.2s;
          z-index: 2;
          /* Add positioning styles here, outside of individual slides */
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background:#fff;
          border:none;
          border-radius:50%;
          width:44px;
          height:44px;
          box-shadow:0 2px 8px rgba(0,0,0,0.08);
          font-size:2rem;
          color:#00B5FF;
        }
        .carousel-arrow.left { left: 24px; }
        .carousel-arrow.right { right: 24px; }
        
        .carousel-indicators { 
            position: absolute; 
            left: 50%; 
            transform: translateX(-50%);
            bottom: 18px;
            z-index: 2;
            display: flex; /* Use flexbox for indicators */
            align-items: center;
            justify-content: center;
        }
        .indicator-dot {
          display: inline-block;
          width: 18px;
          height: 4px;
          border-radius: 2px;
          margin: 0 2px;
          background: #b3e6fa; /* Default inactive */
          transition: background 0.3s ease-in-out;
          cursor: pointer;
        }
        .indicator-dot.active {
            background: #fff; /* Active color */
        }
      </style>
      <div class="carousel-slide-viewport">
        <div class="carousel-slide-wrapper"></div>
      </div>
      <!-- Arrows and Indicators are now direct children of the main el -->
      <button class="carousel-arrow left">
          <span style="font-size:2rem;line-height:1;">&lt;</span>
        </button>
      <button class="carousel-arrow right">
          <span style="font-size:2rem;line-height:1;">&gt;</span>
        </button>
      <div class="carousel-indicators"></div>
    `;

    // Get references to important elements
    this.wrapper = this.el.querySelector('.carousel-slide-wrapper');
    this.leftArrow = this.el.querySelector('.carousel-arrow.left');
    this.rightArrow = this.el.querySelector('.carousel-arrow.right');
    this.indicatorsContainer = this.el.querySelector('.carousel-indicators');

    // Attach initial event listeners
    this.leftArrow.onclick = () => this.prev();
    this.rightArrow.onclick = () => this.next();

    // Initial render of the first slide and indicators
    this.updateDisplay();
    this.resetTimer();
  }

  // New method to update the displayed slides and indicators
  updateDisplay() {
    const { current, prev, direction } = this.state;

    // Clear current slides in the wrapper
    this.wrapper.innerHTML = '';

    // Create and append the current slide element
    const currentSlideElement = this.createSlideElement(slides[current]);
    this.wrapper.appendChild(currentSlideElement);

    // Update indicators
    this.updateIndicators();
  }

  // New method to create a slide DOM element
  createSlideElement(slideData) {
      const slideElement = document.createElement('div');
      slideElement.className = 'carousel-slide position-relative d-flex align-items-center justify-content-between p-4';
      slideElement.style.cssText = "background:#00B5FF;border-radius:2rem;min-height:260px;overflow:hidden;"; // Apply styles directly or via class
      slideElement.innerHTML = `
        <div class="carousel-content text-white" style="max-width:50%">
          <div class="carousel-title fw-bold" style="font-size:2.2rem;font-weight:900;">${slideData.title}</div>
          <div class="carousel-subtitle mb-4" style="font-size:1.2rem;">${slideData.subtitle}</div>
        </div>
        <img src="${slideData.img}" alt="${slideData.alt}" style="max-height:160px;max-width:40%;object-fit:contain;">
      `;
       // Arrows are outside the individual slide div now
       // Indicators are outside the individual slide div now
      return slideElement;
  }

  // New method to update indicator dots
  updateIndicators() {
      const { current } = this.state;
      this.indicatorsContainer.innerHTML = ''; // Clear current indicators
      slides.forEach((_, i) => {
          const dot = document.createElement('span');
          dot.className = `indicator-dot${i === current ? ' active' : ''}`;
          dot.onclick = () => this.slideTo(i, i > current ? 1 : -1, false); // Add click listener to indicators
          this.indicatorsContainer.appendChild(dot);
      });
  }

  next(auto = false) {
    if (this.isSliding) return;
    const nextIndex = (this.state.current + 1) % slides.length;
    this.slideTo(nextIndex, 1, auto);
  }

  prev() {
    if (this.isSliding) return;
    const nextIndex = (this.state.current - 1 + slides.length) % slides.length;
    this.slideTo(nextIndex, -1, false);
  }

  slideTo(nextIndex, direction, auto) {
    if (this.isSliding) return;
    this.isSliding = true;

    const { current } = this.state;
    const prevIndex = current; // The current slide becomes the previous one during transition

    // Get slide data
    const currentSlideData = slides[prevIndex]; // This is the slide currently visible
    const nextSlideData = slides[nextIndex]; // This is the slide we are moving to

    // Create elements for both slides
    const currentSlideElement = this.createSlideElement(currentSlideData);
    const nextSlideElement = this.createSlideElement(nextSlideData);

    // Position the slides for the start of the transition
    if (direction === 1) { // Moving to the right (next)
        this.wrapper.innerHTML = ''; // Clear wrapper
        currentSlideElement.style.transform = 'translateX(0%)';
        nextSlideElement.style.transform = 'translateX(100%)';
        this.wrapper.appendChild(currentSlideElement);
        this.wrapper.appendChild(nextSlideElement);
        this.wrapper.style.width = '200%'; // Need space for two slides
        this.wrapper.style.transform = 'translateX(0%)'; // Initial position
    } else { // Moving to the left (previous)
        this.wrapper.innerHTML = ''; // Clear wrapper
        currentSlideElement.style.transform = 'translateX(0%)';
        nextSlideElement.style.transform = 'translateX(-100%)';
         this.wrapper.appendChild(nextSlideElement);
         this.wrapper.appendChild(currentSlideElement);
         this.wrapper.style.width = '200%'; // Need space for two slides
         this.wrapper.style.transform = 'translateX(-100%)'; // Initial position
    }

    // Force a reflow to ensure initial positions are applied before transition
    this.wrapper.offsetHeight; 

    // Apply the transition and target transform
    this.wrapper.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    if (direction === 1) { // Move left to show next
        this.wrapper.style.transform = 'translateX(-100%)';
    } else { // Move right to show previous
        this.wrapper.style.transform = 'translateX(0%)';
    }

    // Listen for the end of the transition
    const handleTransitionEnd = () => {
        this.wrapper.removeEventListener('transitionend', handleTransitionEnd);

        // Animation finished, update state and clean up
        this.state.prev = prevIndex; // Update prev to the slide we just moved from
        this.state.current = nextIndex; // Update current to the slide now visible
        this.state.direction = direction;
        this.isSliding = false;

        // Reset wrapper styles and render only the current slide
        this.wrapper.style.transition = 'none';
        this.wrapper.style.transform = 'translateX(0%)';
        this.wrapper.style.width = '100%';
        this.updateDisplay(); // Render only the current slide

        if (!auto) this.resetTimer();
    };

    this.wrapper.addEventListener('transitionend', handleTransitionEnd);
  }

  resetTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(true), 10000);
  }

  // The main render function now just returns the pre-built element
  render() {
    return this.el;
  }

  disconnectedCallback() {
    if (this.timer) clearInterval(this.timer);
    // Remove event listeners if necessary (though in this case, they are on this.el which is removed)
    // If attached to global objects like window, they should be removed here.
  }
} 