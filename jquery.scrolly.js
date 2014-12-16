function scrollyScroll(scrollStep, pagerID){
	scrollStep.each(function(){
		if ($(this).offset().top<$(window).scrollTop() || $(window).scrollTop() + $(window).height() == $(document).height()){
			$('#'+pagerID+' li a').removeClass('active');
			$('#'+pagerID+' li').find('#' + $(this).data('scroll-order')).addClass('active');
		}
	});
}

(function( $ ){
	$.fn.scrolly = function(options) {

		var defaults = {
			pagerContainer: 'body',
			pagerID: 'full-pager',
			pagerStepClass: 'scroll-step-pager-step',
			pagerContent: '•'		
		}
		var options =  $.extend(defaults, options);
		
		var stepControl='';		

		this.each(function(index) {
			$(this).attr('data-scroll-order','scroll-step-'+index);
			stepControl+='<li><a href="" class="'+options.pagerStepClass+'" id="scroll-step-'+index+'">'+options.pagerContent+'</a></li>';
		});
		if(stepControl!='') {
			stepControl = '<ul id="'+options.pagerID+'">'+stepControl+'</ul>';
			
			$(options.pagerContainer).append(stepControl);
			$('#'+options.pagerID+' a').first().addClass('active');
		}

		$('#'+options.pagerID+' a').click(function(e){
			scrollToSection($('*[data-scroll-order="' + ($(this).attr('id')) +'"]'), ($(this).parent().prevAll('.active').length > 0));
			e.preventDefault();
		});

		function scrollToSection(element, goingUp){
			$('html, body').animate({
				scrollTop: Math.ceil(element.offset().top+5)
			});
		}
			
		$(window).bind('scroll',$.proxy(function(){
		 scrollyScroll($(this), options.pagerID);
		}, this));
		
	};
})( jQuery );