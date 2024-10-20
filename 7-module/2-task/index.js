import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }

  open() {
    const template = `
    <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
    </div>
    `;
    const modal = createElement(template);
    const title = modal.querySelector('.modal__title');
    const body = modal.querySelector('.modal__body');
    const modalClose = modal.querySelector('.modal__close');

    const close = () => {
      document.body.classList.remove('is-modal-open');
      modal.remove();
    };

    const keyClose = (e) => {
      if (e.code === 'Escape') {
        document.body.classList.remove('is-modal-open');
        modal.remove();
        document.removeEventListener('keydown', keyClose);
      }
    };

    modalClose.addEventListener('click', close);
    document.addEventListener('keydown', keyClose);
    title.textContent = this.modalTitle;
    body.innerHTML = '';
    body.append(this.modalBody);

    document.body.classList.add('is-modal-open');
    document.body.append(modal);
  }

  setTitle(title) {
    this.modalTitle = title;
    const titleElem = document.querySelector('.modal__title');
    if (titleElem) {
      titleElem.textContent = title;
    }
  }

  setBody(node) {
    this.modalBody = node;
    const bodyElem = document.querySelector('.modal__body');
    if (bodyElem) {
      bodyElem.innerHTML = '';
      bodyElem.append(node);
    }
  }

  close() {
    const modal = document.querySelector('.modal');
    if (modal) {
      document.body.classList.remove('is-modal-open');
      modal.remove();
    }
  }
}