//Scrolly
function scrollyScroll(scrollStep, pagerID, offset){
	scrollStep.each(function(){
		if ($(this).offset().top<$(window).scrollTop()-offset || $(window).scrollTop() + $(window).height() == $(document).height()){
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
			pagerContent: '•',
			offset: 0,
			delimiter: ''
		}
		var options =  $.extend(defaults, options);
		
		var stepControl='';		
		var stepCount = this.length;
		
		this.each(function(index) {
			$(this).attr('data-scroll-order','scroll-step-'+index);
			stepControl+='<li><a href="" class="'+options.pagerStepClass+'" id="scroll-step-'+index+'">'+options.pagerContent+'</a></li>';
			if (options.delimiter != '' && stepCount != index+1){
				stepControl+='<li>'+options.delimiter+'</li>';
			}
		});
		if(stepControl!='') {
			stepControl = '<ul id="'+options.pagerID+'">'+stepControl+'</ul>';
			
			$(options.pagerContainer).append(stepControl);
			$('#'+options.pagerID+' a').first().addClass('active');
		}

		$('#'+options.pagerID+' a').click(function(e){
			scrollToSection($('*[data-scroll-order="' + ($(this).attr('id')) +'"]'), ($(this).parent().prevAll('.active').length > 0), options.offset);
			e.preventDefault();
		});

		function scrollToSection(element, goingUp, offset){
			$('html, body').animate({
				scrollTop: Math.ceil(element.offset().top+5+offset)
			});
		}
			
		$(window).bind('scroll',$.proxy(function(){
		 scrollyScroll($(this), options.pagerID, options.offset);
		}, this));
		
	};
})( jQuery );