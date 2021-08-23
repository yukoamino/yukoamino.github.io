var menuFlg = false;
var menuTabFlg = false;

$(function(){
  // PC menu
	var menuTimer = 0;
	var menu = null;

	if(window.ontouchstart !== null) {
		// pc
		$(".js-menu-list > li").on('mouseenter', function() {
			menuFlg = true;
			menu = $(this);
			clearTimeout(menuTimer);
			menuTimer = setTimeout(function(){
				if(menuFlg) {
					menu.addClass('active');
					menu.find(".js-menu-panel").stop(true, true).fadeIn(300);
				}
			}, 300);
		});
		$(".js-menu-list > li").on('mouseleave', function() {
			menuFlg = false;
			$(this).removeClass('active').find(".js-menu-panel").fadeOut(200);
		});
	} else {
		// tab
		// 親ナビの遷移制御
		$('.js-menu-list > li > a').on('click',function(){
			if($(this).parent().hasClass('nolink')) {
				return false;
			}
		});
		// メニュー開く
		$(".js-menu-list > li").on("touchstart", function () {
			if(menu !== null && !$(this).hasClass('active')){
				menu.find(".js-menu-panel").hide();
				menu.addClass("nolink");
			}
			menuTabFlg = true;
			$(".js-menu-list > li").removeClass('active');
			$(this).find(".js-menu-panel").stop(true, true).fadeIn(300);
			$(this).addClass("active");
			menu = $(this);
			setTimeout(function(){
				menu.removeClass("nolink");
			}, 500);
		});
		// メニュー閉じる（ヘッダー以外触ったら）
		var moveFlg = false;
		$(".s388-main, .s388-header-pc_top").on('touchstart', function() {
			moveFlg = false;
		});
		$(".s388-main, .s388-header-pc_top").on('touchmove', function() {
			moveFlg = true;
		});
		$(".s388-main, .s388-header-pc_top").on('touchend', function() {
			if (moveFlg) {
				// 移動中は閉じない
				return;
			}
			$(".js-menu-list > li").removeClass('active');
			$(".js-menu-list > li.js-menu-list-sub").addClass('nolink');
			$(".js-menu-list > li").find(".js-menu-panel").fadeOut(200);
			menuTabFlg = false;
		});
	}

  // SP menu
	$('.js-btn-menu').on('click',function(){
		$.when(
			$('html,body').animate({scrollTop:0}, 'fast')
		).done(function() {
			$('.js-btn-menu').toggleClass('close');
  		$('.js-header-sp').toggleClass('absolute');
  		$('.js-body-menu').fadeToggle(500);
		});
	});

	$(".js-accordion-menu").on("click", function() {
		$(this).next('dd').slideToggle();
    $(this).toggleClass("active");
    $('.js-accordion-menu').not($(this)).next('dd').slideUp();
    $('.js-accordion-menu').not($(this)).removeClass("active");
	});

	// SP menu aタグクリックしたらメニュー閉じる
  $(".js-body-menu a").on("click", function() {
		$('.js-btn-menu').toggleClass('close');
		$('.js-header-sp').toggleClass('absolute');
		$('.js-body-menu').fadeToggle(500);
	});
});

var startPos = 0;
var hashFlg = false;
var scrollTop = 0;
var scrollTimer = null;
$(window).on("scroll", function() {
	// if($('.js-menu-panel').is(':visible')) {
	// 	return;
	// }
	if($('.js-header-sp').is(':visible')) {
		$('.js-header-pc').hide();
		$(".js-menu-list > li").removeClass('active');
		$(".js-menu-list > li.js-menu-list-sub").addClass('nolink');
		$(".js-menu-list > li").find(".js-menu-panel").fadeOut(200);
		menuFlg = false;
		menuTabFlg = false;
		return;
	}
	if (location.hash &&!hashFlg) {
		$('.js-header-pc').hide();
		return;
	}
	clearTimeout(scrollTimer);
	scrollTimer = setTimeout(function(){
		console.log('event');
		scrollTop = $(window).scrollTop();
		if (scrollTop <= 140 ) {
			$('.js-header-pc').fadeIn();
		} else {
			if (scrollTop > startPos) {
				$('.js-header-pc').fadeOut();
				$(".js-menu-list > li").removeClass('active');
				$(".js-menu-list > li.js-menu-list-sub").addClass('nolink');
				$(".js-menu-list > li").find(".js-menu-panel").fadeOut(200);
				menuFlg = false;
				menuTabFlg = false;
			} else {
				$('.js-header-pc').fadeIn();
			}
		}
		startPos = scrollTop;
	}, 300);
});

$(window).on("resize", function() {
	var w = $(window).width();
	if (w > 899) {
		// pc
		$('.js-btn-menu').removeClass('close');
		$('.js-header-sp').removeClass('absolute');
		$('.js-body-menu').hide();
    $('.js-accordion-menu').next('dd').slideUp();
    $('.js-accordion-menu').removeClass("active");
		if ($(window).scrollTop() <= 140 ) {
			$('.js-header-pc').show();
		}
	} else {
		// sp
		$('.js-header-pc').hide();
		$(".js-menu-list > li").removeClass('active');
		$(".js-menu-list > li.js-menu-list-sub").addClass('nolink');
		$(".js-menu-list > li").find(".js-menu-panel").fadeOut(200);
		menuFlg = false;
		menuTabFlg = false;
	}
});

// pagetop
$(window).on("scroll", function() {
  if (100 < $(this).scrollTop()) {
    $(".js-pagetop").fadeIn();
  } else {
    $(".js-pagetop").fadeOut();
  }
});

$(window).on("scroll", function() {
  var documentHeight = $(document).height();
  var scrollPosition = $(this).height() + $(this).scrollTop();
  var footerHeight = $(".js-footer").innerHeight();

  if (documentHeight - scrollPosition <= footerHeight) {
    $(".js-pagetop").css({
      position: "absolute"
    });
  } else {
    $(".js-pagetop").css({
      position: "fixed"
    });
  }
});

$(function(){
  $('.js-pagetop a').on("click", function() {
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - 0;

		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});

// anchor
$(function(){
  $("a:not(.inline)[href^=#]").on("click", function() {
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		var offset = 0;

		// SP追従headerの高さ
		if ($('.js-header').is(':visible')) {
			offset = 50;
		} else {
			if (position > startPos) {
			} else {
				offset = 140;
			}
			menuFlg = false;
			$(".js-menu-list > li").removeClass('active').find(".js-menu-panel").fadeOut(200);
		}
		position = target.offset().top - offset;

		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});

// hash
$(function(){
	$(window).on('load',function(){
		if (!$('.js-header').is(':visible')) {
			// return;
		}
		var hash = location.hash;
		if(hash){
			$('html,body').stop().scrollTop(0);
			var speed = 500;
			var target = $(hash);
			var position = target.offset().top;
			var offset = 0;

			// SP追従headerの高さ
			if ($('.js-header').is(':visible')) {
				offset = 50;
			} else {
				// offset = 140;
			}
			position = target.offset().top - offset;

			$("html, body").animate({scrollTop:position}, speed, "swing");

			setTimeout(function(){
				hashFlg = true;
			}, 1000);
		}
	});
});

// btn-lang
$(function(){
	var val = $('body').data('url');
	if(val) {
		$('.js-btn-lang').attr("href", val);
	} else {
		$('.s388-header-pc_top-btn-lang .js-btn-lang').hide();
		$('.s388-header-sp_btn-lang .js-btn-lang').css({
			opacity: '0',
			width: '20px'
		});
	}
});
