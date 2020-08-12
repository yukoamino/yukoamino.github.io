import velocity from 'velocity-animate';

export default class ModalUI {
  constructor() {
    this.$sectionText = '.js-section-text';
    this.$sectionTextList = document.querySelectorAll('.js-section-text');
    this.$modalWrap = '.js-modal-wrap';
    this.$modalWrapList = document.querySelectorAll('.js-modal-wrap');
    this.$openButton = document.querySelectorAll('.js-modal-open');
    this.$closeButton = document.querySelectorAll('.js-modal-close');

    this.bind();
  }

  bind() {
    if (this.$openButton === null) {
      return;
    } else {
      for (var i = 0; i < this.$openButton.length; i++) {
        this.$openButton[i].addEventListener('click', (e) => {
          var ele = e.target.closest(this.$sectionText);
          var eleModal = document.getElementById(e.target.hash.slice(1));
          e.preventDefault();
          this.hide(ele);
          this.openModal(eleModal);
        });
      }

      for (var i = 0; i < this.$closeButton.length; i++) {
        this.$closeButton[i].addEventListener('click', (e) => {
          var eleModal = e.target.closest(this.$modalWrap);
          var elements = [].slice.call(this.$modalWrapList);
          var idx = elements.indexOf(eleModal);
          var elementsText = [].slice.call(this.$sectionTextList);
          var ele = elementsText[idx];
          e.preventDefault();
          this.closeModal(eleModal);
          this.show(ele);
        });
      }
    }
  }

  hide(ele) {
    velocity(ele, {
      opacity: 0,
    }, {
      duration: 300,
      }
    );
  }

  openModal(ele) {
    velocity(ele, {
      opacity: [1, 0],
    }, {
      delay: 400,
      duration: 300,
      display: 'block',
      complete: function(){
        ele.classList.add('is-open');
        document.body.classList.add('is-open');
      }
    });
  }

  show(ele) {
    velocity(ele, {
      opacity: 1,
    }, {
      duration: 300,
      }
    );
  }

  closeModal(ele) {
    velocity(ele, {
      opacity: 0,
    }, {
      duration: 300,
      display: 'none',
      complete: function(){
        ele.classList.remove('is-open');
        document.body.classList.remove('is-open');
      }
    });
  }
}