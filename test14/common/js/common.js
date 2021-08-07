$(function(){
  // PC menu
	var menuTimer = 0;
	var menuFlg = false;
	var menu = null;
	// $(".js-menu-list > li").hover(
	// 	function() {
	// 		menuFlg = true;
	// 		menu = $(this);
	// 		clearTimeout(menuTimer);
	// 		menuTimer = setTimeout(function(){
	// 			if(menuFlg) {
	// 				menu.addClass('active');
	// 				menu.find(".js-menu-panel").stop(true, true).fadeIn(300);
	// 			}
	// 		}, 500);
	// 	},
	// 	function() {
	// 		menuFlg = false;
	// 		$(this)
	// 			.removeClass('active')
	// 			.find(".js-menu-panel")
	// 			.fadeOut(200);
	// 	}
	// );

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
			}, 500);
		});
		$(".js-menu-list > li").on('mouseleave', function() {
			menuFlg = false;
			$(this).removeClass('active').find(".js-menu-panel").fadeOut(200);
		});
	} else {
		// tab
		$('.js-menu-list > li > a').on('click',function(){
			if($(this).parent().hasClass('nolink')) {
				return false;
			}
		});
		$(".js-menu-list > li").on("touchstart", function () {
			if(menu !== null && !$(this).hasClass('active')){
				menu.find(".js-menu-panel").hide();
				menu.addClass("nolink");
			}
			$(".js-menu-list > li").removeClass('active');
			$(this).find(".js-menu-panel").stop(true, true).fadeIn(300);
			$(this).addClass("active");
			menu = $(this);
			setTimeout(function(){
				menu.removeClass("nolink");
			}, 500);
		});
		$(".s388-main, .s388-header-pc_top").on('touchstart', function() {
			$(".js-menu-list > li").removeClass('active');
			$(".js-menu-list > li.js-menu-list-sub").addClass('nolink');
			$(".js-menu-list > li").find(".js-menu-panel").fadeOut(200);
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
			}
			position = target.offset().top - offset;

			$("html, body").animate({scrollTop:position}, speed, "swing");
		}
	});
});

// btn-lang
$(function(){
	var val = $('body').data('url');
	var url = "./";
	if(val) {
		url = val;
	}
	$('.js-btn-lang').attr("href", url);
});
