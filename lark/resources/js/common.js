import 'babel-polyfill';

import ModalUI from './modules/ModalUI';

new ModalUI();

class Common {
  /**
   * constructor
   */
  constructor() {
    // this.redirect();

    // this.scrollFadeIn = new ScrollFadeIn('.scrollFadeIn');
    // this.navUI = new NavUI('.nav');
    // this.headerUI = new HeaderUI('.header');
    // this.confirmModalUI = new ConfirmModalUI('.overlay');
    // this.topVisualUI = new TopVisualUI('sp');
    // this.videoUI = new VideoUI();
    // this.topMainvisualUI = new TopMainvisualUI();

    // this.$main = document.querySelector('.main');
    // this.$mainMovie = document.querySelector('.js-mv-movie');

    // this.startAnimation();
    // this.startMainvisualVideo();
  }

  /**
   * デバイスリダイレクト
   */
  // redirect() {
  //   if (!CONFIG.IS_MOBILE) {
  //     location.href = `${location.pathname.replace('/spn', '')}${location.search}${location.hash}`;
  //   }
  // }

  /**
   * アニメーションを開始する
   */
  // startAnimation() {
  //   this.confirmModalUI.on('close', () => {
  //     this.topVisualUI.setAnimation();
  //   });
  // }

  // メインビジュアルのビデオタグの再生と、初回アクセスのローカルストレージをチェックする。
  // startMainvisualVideo() {
  //   this.confirmModalUI.on('close', () => {
  //     if (localStorage.getItem('firstmainvisual02') !== 'isFirst' && this.$mainMovie !== null) {
  //       this.$main.classList.add('movie-end');
  //       this.videoUI.startVideo();
  //       this.topMainvisualUI.isFirst();
  //     } else {
  //       this.topMainvisualUI.switchingMainVisual();
  //     }
  //   });
  // }
}

//window.COMMON = new Common();
