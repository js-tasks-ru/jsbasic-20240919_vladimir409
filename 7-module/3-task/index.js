import createElement from './../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.createSlider();
    this.onClick();
  }

  createSlider() {
    const template = `
  <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress"  style="width: 0%;"></div>
    <div class="slider__steps">
    </div>
  </div>
    `;
    this.elem = createElement(template);
    const sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i ++) {
      const stepElem = document.createElement('span');
      sliderSteps.append(stepElem);
      if (i === this.value) {
        stepElem.classList.add('slider__step-active');
      }
    }
  }

  onClick() {
    const elements = this.elem.querySelectorAll('.slider__steps span');
    
    this.elem.addEventListener('click', (e) => {
      const segments = elements.length - 1;
      const left = e.clientX - this.elem.getBoundingClientRect().left;
      const leftRelative = left / this.elem.offsetWidth;
      const value = Math.round(leftRelative * segments);

      const sliderValue = document.querySelector('.slider__value');
      const sliderThumb = document.querySelector('.slider__thumb');
      const sliderProgress = document.querySelector('.slider__progress');
      
      sliderValue.textContent = value;
      sliderThumb.style.left = `${value / segments * 100}%`;
      sliderProgress.style.width = `${value / segments * 100}%`;

      const sliderChange = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true,
      });

      this.elem.dispatchEvent(sliderChange);
    });
  }
}