import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.createCarousel(slides);
  }

  createSlide(slideKeys) {
    const name = slideKeys.name;
    const price = slideKeys.price.toFixed(2);
    const image = slideKeys.image;
    const id = slideKeys.id;
    const template = `
    <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
    const slide = createElement(template);
    const productAddEvent = new CustomEvent('product-add', {
      detail: id,
      bubbles: true,
    });
    slide.addEventListener('click', (e) => {
      if (e.target.closest('.carousel__button')) {
        slide.dispatchEvent(productAddEvent);
      }
    });
    return slide;
  }

  createControls() {
    const templateRight = `
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    `;
    const templateLeft = `
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    `;
    const container = document.createDocumentFragment();
    container.append(createElement(templateRight));
    container.append(createElement(templateLeft));
    return container;
  }

  createCarousel(slides) {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    const containerSlides = document.createElement('div');
    containerSlides.classList.add('carousel__inner');
    carousel.append(this.createControls());
    for (let value of slides) {
      containerSlides.append(this.createSlide(value));
    }
    carousel.append(containerSlides);

    const carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
    const carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
    carouselArrowLeft.style.display = 'none';

    let currentSlideCount = 1;
    let currentOffset = 0;
    carousel.addEventListener('click', (e) => {
      const slideWidth = containerSlides.offsetWidth;
      if (e.target.closest('.carousel__arrow_right')) {
        currentSlideCount += 1;
        currentOffset += slideWidth;
        containerSlides.style.transform = `translateX(-${currentOffset}px)`;
      } else if (e.target.closest('.carousel__arrow_left')) {
        currentOffset = currentOffset - slideWidth;
        containerSlides.style.transform = `translateX(-${currentOffset}px)`;
        currentSlideCount -= 1;
      }
      if (currentSlideCount > 1) {
        carouselArrowLeft.style.display = 'flex';
      } else {
        carouselArrowLeft.style.display = 'none';
      } if (currentSlideCount === slides.length) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowRight.style.display = 'flex';
      }
    });
    return carousel;
  }
}