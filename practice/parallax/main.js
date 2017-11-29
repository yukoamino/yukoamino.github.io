$(function(){
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		var headerHeight = $('header').outerHeight();
		var section1Height = $('.section1').outerHeight();

		if(50 < scrollTop && scrollTop < 1050){
			$('.section1 .inner').css('background-position', 'center ' + (scrollTop - headerHeight) + 'px');
		}else if(1050 < scrollTop){
			$('.section1 .inner').css('background-position', 'center ' + (1050 - headerHeight) + 'px');
		}

		if(1592 < scrollTop && scrollTop < 2510){
			$('.section2 .inner').css('background-position', 'center ' + (scrollTop - section1Height - headerHeight) + 'px');
		}else if(2510 < scrollTop){
			$('.section2 .inner').css('background-position', 'center ' + (2510 - section1Height - headerHeight) + 'px');
		}
	});
});