// ======================================
// modal
// ======================================

SMTC.COMMON.MODAL = function(target) {
  this.btn = $(target);
  this.modalboxId = '#' + this.btn.attr('href');
  this.modalbox = $(this.modalboxId);
  this.modalInr = this.modalbox.find('.jsc-modal-detail');
  this.close = this.modalbox.find('.jsc-modal-close');
  this.scrollbarObj = null;
  this.mode = '';
  this.modeOld = '';
  this.isScroll = false;

  this.win = $(window);
  this.html = $('html');
  this.body = $('body');
  this.scroll = null;

  this.init();
};
SMTC.COMMON.MODAL.prototype = {
  init: function() {
    this.event();
  },
  event: function() {
    var _self = this;
    this.btn.on('click',function(e){
      e.preventDefault();
      _self.openModal();
      return false;
    });
    this.close.on('click',function(e){
      e.preventDefault();
      _self.closeModal();
      return false;
    });
    this.modalbox.on('click',function(e){
      // e.preventDefault();
      var el = $(e.target);
      if (el.hasClass('modal-01')) {
        _self.closeModal();
        return false;
      }
    });
    $('body').on('closeCommonModal', function() {
      _self.closeModal();
    });

    // 長いコンテンツの場合、スクロールエリアの高さを指定する
    this.win.on('load',function(){
      _self.setScrollHt();
    });
    this.win.on('resize orientationchange',function(){
      // modal開いてるときのみ処理
      if ( !_self.modalbox.hasClass('is-active') ) {
        return;
      }
      _self.modeOld = _self.mode;
      _self.setScrollHt();

      // スクロールバー更新
      _self.updateScrollbar();
      // スクロールバー必要な場合に設置、不要は削除
      if(_self.isScroll){
        if(_self.scrollbarObj == null){
          _self.setScrollbar();
          // console.log('setscrollbar');
        }
        _self.modalbox.addClass('is-scroll');
      }else{
        _self.deleteScrollbar();
        _self.modalbox.removeClass('is-scroll');
      }

      // console.log(_self.mode);
      if(_self.modeOld == 'sp' && _self.mode == 'pc'){
        _self.body.css('top', '');
        _self.scroll = _self.btn.offset().top - 100;
        _self.body.css('top', -(_self.scroll));
      }
    });
  },
  openModal: function() {
    $('.fixed-message-01').hide();
    this.modalbox.addClass('is-active is-visible');
    this.scroll = this.win.scrollTop();
    this.setScrollHt();
    if(this.isScroll){
      this.setScrollbar();
      this.modalbox.addClass('is-scroll');
    }
    this.modalInr.scrollTop(0);
    this.body.css('top', -(this.win.scrollTop()));
    this.body.addClass('is-modalview');
  },
  closeModal: function() {
    this.modalbox.removeClass('is-active');
    this.body.removeClass('is-modalview');
    this.modalbox.removeClass('is-landscape');
    if(this.scroll != null) {
      var scrollTop = this.scroll;
      this.win.scrollTop(scrollTop);
      this.scroll = null;
      this.body.css('top', '');
    }
    $('.fixed-message-01').show();
    var _self = this;
    setTimeout(function(){
      _self.modalbox.removeClass('is-visible');
      _self.modalbox.removeClass('is-scroll');
      _self.deleteScrollbar();
    }, 400);
  },
  setScrollHt: function() {
    var mnsHt = 0;
    if ( this.win.outerWidth() <= 768 ) {
      if (Math.abs(window.orientation) === 90) {
        // 横向き
        mnsHt = 110;
        this.modalbox.addClass('is-landscape');
        // console.log('横向き');
      } else {
        // 縦向き
        mnsHt = 260;
        this.modalbox.removeClass('is-landscape');
      }
      this.mode = 'sp';
    } else {
      mnsHt = 200;
      this.mode = 'pc';
      this.modalbox.removeClass('is-landscape');
    }
    let winHt = this.win.outerHeight() - mnsHt;
    // let winHt = this.win.outerHeight() * 0.9 - mnsHt;
    if ( this.modalInr.find('.jsc-modal-detail-inner').eq(0).outerHeight() > winHt ) {
      // fixedでscrollbar表示
      this.isScroll = true;
      this.modalInr.height(Math.floor(winHt));
      // console.log('fixedでscrollbar表示');
    } else {
      // モーダルコンテンツが枠内におさまるとき
      // fixedでscrollbar非表示
      this.isScroll = false;
      this.modalInr.height('auto');
      // console.log('fixedでscrollbar非表示');
    }
  },
  setScrollbar: function() {
    this.scrollbarObj = new PerfectScrollbar(this.modalboxId + ' .jsc-modal-detail', {
      wheelPropagation: false,
      suppressScrollX: true
    });
  },
  deleteScrollbar: function() {
    if(this.scrollbarObj == null){
      return;
    }
    this.scrollbarObj.destroy();
    this.scrollbarObj = null;
  },
  updateScrollbar: function() {
    if(this.scrollbarObj == null){
      return;
    }
    this.scrollbarObj.update();
  }
};
