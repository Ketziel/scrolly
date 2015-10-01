function scrollyScroll(scrollStep, pagerID, offset) {

    scrollStep.each(function () {
        if ($(this).offset().top < $(window).scrollTop() - offset || $(window).scrollTop() + $(window).height() == $(document).height()) {
            $('#' + pagerID + ' li a').removeClass('active');
            $('#' + pagerID + ' li').find('#' + $(this).data('scroll-order')).addClass('active');
            if ($('.step-up').length) {
                $('#' + pagerID + ' li').find('.step-up').attr('id', 'scroll-step-' + (parseInt((($(this).data('scroll-order')).slice(12)), 10) - 1))
            };
            if ($('.step-up').length) {
                $('#' + pagerID + ' li').find('.step-down').attr('id', 'scroll-step-' + (parseInt((($(this).data('scroll-order')).slice(12)), 10) + 1))
            };
        }
    });
}

(function ($) {
    $.fn.scrolly = function (options) {
        var defaults = {
            pagerContainer: 'body',
            pagerID: 'full-pager',
            pagerStepClass: 'scroll-step-pager-step',
            pagerContent: '&#8226',
            offset: 0,
            delimiter: '',
            stepUp: '',
            stepDown: '',
            toTop: '',
            toBottom: '',
            hidePagers: false
        }
        var options = $.extend(defaults, options);
        var stepControl = '';
        var stepCount = this.length;
        this.each(function (index) {
            $(this).attr('data-scroll-order', 'scroll-step-' + index);
            if (options.toTop != '' && index == 0) {
                stepControl += '<li><a href="" class="' + options.pagerStepClass + '" id="scroll-step-' + index + '">' + options.toTop + '</a></li>';
            }
            if (options.stepUp != '' && index == 0) {
                stepControl += '<li><a href="" class="' + options.pagerStepClass + ' step-up" id="scroll-step-0">' + options.stepUp + '</a></li>';
            }
            if (options.hidePagers != true) {
                stepControl += '<li><a href="" class="' + options.pagerStepClass + ' single-step" id="scroll-step-' + index + '">' + options.pagerContent + '</a></li>';
                if (options.delimiter != '' && stepCount != index + 1) {
                    stepControl += '<li>' + options.delimiter + '</li>';
                }
            }
            if (options.stepDown != '' && index == stepCount - 1) {
                stepControl += '<li><a href="" class="' + options.pagerStepClass + ' step-down" id="scroll-step-1">' + options.stepDown + '</a></li>';
            }
            if (options.toBottom != '' && index == stepCount - 1) {
                stepControl += '<li><a href="" class="' + options.pagerStepClass + '" id="scroll-step-' + index + '">' + options.toBottom + '</a></li>';
            }
        });
        
        if (stepControl != '') {
            stepControl = '<ul id="' + options.pagerID + '">' + stepControl + '</ul>';

            $(options.pagerContainer).append(stepControl);
            $('#' + options.pagerID + ' a.single-step').first().addClass('active');
        }

        $('#' + options.pagerID + ' a').click(function (e) {
            scrollToSection($('*[data-scroll-order="' + ($(this).attr('id')) + '"]'), ($(this).parent().prevAll('.active').length > 0), options.offset);
            e.preventDefault();
        });

        function scrollToSection(element, goingUp, offset) {
            $('html, body').animate({
                scrollTop: Math.ceil(element.offset().top + 5 + offset)
            });
        }

        $(window).bind('scroll', $.proxy(function () {
            scrollyScroll($(this), options.pagerID, options.offset);
        }, this));

    };
})(jQuery);
