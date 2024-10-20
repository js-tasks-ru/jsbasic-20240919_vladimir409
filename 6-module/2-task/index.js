import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = this.createCard(product);
  }

  createCard(template) {
    const productName = template.name;
    const price = template.price.toFixed(2);
    const imgName = template.image;
    const htmlCard = `
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${imgName}" class="card__image" alt="product">
        <span class="card__price">€${price}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${productName}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `;
    const card = createElement(htmlCard);

      card.addEventListener('click', (e) => {
               
        if (e.target.closest('.card__button')) {
          const eventAdd = new CustomEvent('product-add', {
            detail: template.id,
            bubbles: true,
          });
          card.dispatchEvent(eventAdd);
        }
      });
    return card;
  }
}