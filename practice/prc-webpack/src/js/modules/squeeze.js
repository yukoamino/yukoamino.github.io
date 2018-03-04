import $ from 'jquery';

export default function () {
	var $list = $('.js-squeeze-list ul');
	$('.js-squeeze-select select').change(function(){
		var val = $(this).val();

		$list.fadeOut();
		$list.find('li').each(function(){
			$(this).hide();
			if(val == $(this).data('category') || val == ''){
				$(this).show();
			}
		});
		$list.fadeIn();
	});
};
