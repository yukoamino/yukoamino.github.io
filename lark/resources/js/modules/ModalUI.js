import velocity from 'velocity-animate';

export default class ModalUI {
  constructor() {
    this.$modalWrap = '.js-modal-wrap';
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
          var ele = document.getElementById(e.target.hash.slice(1));
          e.preventDefault();
          this.open(ele);
        });
      }

      for (var i = 0; i < this.$closeButton.length; i++) {
        this.$closeButton[i].addEventListener('click', (e) => {
          var ele = e.target.closest(this.$modalWrap);
          e.preventDefault();
          this.close(ele);
        });
      }
    }
  }

  open(ele) {
    velocity(ele, {
      opacity: [1, 0],
    }, {
      duration: 300,
      display: 'block',
      complete: function(){
        ele.classList.add('is-open');
        document.body.classList.add('is-open');
      }
    });
  }

  close(ele) {
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