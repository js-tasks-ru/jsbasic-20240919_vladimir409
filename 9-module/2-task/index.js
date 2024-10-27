import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const carousel = new Carousel(slides);
    const ribbonMenu = new RibbonMenu(categories);
    const stepSlider = new StepSlider({steps: 5, value: 3});
    const cartIcon = new CartIcon();
    const cart = new Cart(cartIcon);

    const carouselContainer = document.querySelector('[data-carousel-holder]');
    const ribbonMenuContainer = document.querySelector('[data-ribbon-holder]');
    const stepSliderContainer = document.querySelector('[data-slider-holder]');
    const cartIconContainer = document.querySelector('[data-cart-icon-holder]');
    const productsContainer = document.querySelector('[data-products-grid-holder]');

    carouselContainer.append(carousel.elem);
    ribbonMenuContainer.append(ribbonMenu.elem);
    stepSliderContainer.append(stepSlider.elem);
    cartIconContainer.append(cartIcon.elem);
    productsContainer.innerHTML = '';

    await fetch('products.json').then((response) => {
      return response.json();
    }).then((result) => {
      this.products = result;
      this.productsGrid = new ProductsGrid(result);
      productsContainer.append(this.productsGrid.elem);
    });

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value,
    });
    
    document.body.addEventListener('product-add', (e) => {
      const productId = e.detail;
      this.products.forEach(element => {
        if (element.id === productId) {
          cart.addProduct(element);
        }
      });
    });

    stepSliderContainer.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail,
      });
    });

    ribbonMenuContainer.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({
        category: e.detail,
      });
    });

    document.addEventListener('change', (e) => {
      const obj = {};
      const targetId = e.target.id;
      if (targetId === 'nuts-checkbox') {
        obj.noNuts = e.target.checked;
      } else if (targetId === 'vegeterian-checkbox') {
        obj.vegeterianOnly = e.target.checked;
      }
      this.productsGrid.updateFilter(obj);
    });
  }
}