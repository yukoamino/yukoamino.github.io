import velocity from 'velocity-animate';

export default class ModalUI {
  constructor() {
    this.$modalWrap = document.querySelector('.js-modal-wrap');
    this.$openButton = document.querySelector('.js-modal-open');
    this.$closeButton = document.querySelector('.js-modal-close');

    this.bind();
  }

  bind() {
    if (this.$openButton === null) {
      return;
    } else {
      this.$openButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });

      this.$closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      })
    }
  }

  open() {
    velocity(this.$modalWrap, {
      opacity: [1, 0],
    }, {
      duration: 300,
      display: 'block',
    });
  }

  close() {
    velocity(this.$modalWrap, {
      opacity: 0,
    }, {
      duration: 300,
      display: 'none',
    });
  }
}