var Frontend;

;(function(global, document, $, skrollr){

    "use strict";

    Frontend = global.Frontend = global.Frontend || {};

    Frontend.initial_pos = [];

    Frontend.$window = $(window);

	Frontend.sticky_navigation_offset_top = 0;

	Frontend.env = '';

	Frontend.init = function(){

		Frontend.env = this.getBootstrapEnvironment();

		var isSmall = ($.inArray( Frontend.env, ["ExtraSmall", "Small"] ) > -1);

		//Headings
		$('.section').each(function(i,e){
			Frontend.initial_pos.push({name:e.id,value:$('#'+e.id).offset().top});
		});

		//scroll event
		$(window).scroll(function() {
			Frontend.update_menu();
			if(!isSmall){
				Frontend.update_nav();
			}
		});

		if(isSmall){
			//Menu
			$('.navbar-default').addClass('sticky').css({ 'position': 'fixed', 'top':0, 'left':0 });
		}else{

			//Barra de estado
			window.____aParams = {"gobabierto":"1","buscadore":"1",};
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = document.location.protocol + '//apis.modernizacion.cl/barra/js/barraEstado.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

			//Menu
			Frontend.sticky_navigation_offset_top = $('.navbar-default').offset().top;
			Frontend.update_nav();
		}

		Frontend.scrollToLink();

			$('.section').css('background-size','cover');
		/*if(isSmall){
		} else {
			skrollr.init({
				forceHeight: false,
			});
		}*/

	};

	Frontend.update_menu = function(){
		var scroll_top = $(window).scrollTop();

		var sel = '';
		$.each(this.initial_pos,function(i,e){
			if (scroll_top > e.value-100) { 
				sel = e.name;
			}
		});
		$('.nav a').removeClass('selected');
		if($(".nav a[href=#"+sel+"]").size()){
			$(".nav a[href=#"+sel+"], #"+sel+"-anchor").addClass('selected');
		}

		var onTop = $('.toTopLink');
		if(scroll_top == 0){
			onTop.hide();
		}else{
			if(!onTop.is(':visible')){
				onTop.delay( 500 ).fadeIn();
			}
		}
	};

	Frontend.update_nav = function(){
		var scroll_top = Frontend.$window.scrollTop();

		if (scroll_top > Frontend.sticky_navigation_offset_top) { 
			$('.navbar-default').addClass('sticky').css({ 'position': 'fixed', 'top':0, 'left':0 });
		} else {
			$('.navbar-default').removeClass('sticky').css({ 'position': 'relative' }); 
		}   
	};

	Frontend.scrollToLink = function(){
		$('a.scrollToLink').click(function () {
	        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	            var $target = $(this.hash);
	            $target = $target.length && $target;
	            $('body').click(); // quita el foco del menú.
	            if ($target.length) {
	            	if($('.navbar-collapse.in').size()) {
					    $('.navbar-header button').click();
					}
		            ga('send', 'event', 'internal', 'click', this.hash);
	            	var offset = ($(this).hasClass('scrollToLinkSecundaria'))?-100:100;
	                var targetOffset = ($(this).hasClass('toTop'))?0:$target.offset().top + offset;
	                $('html,body').animate({ scrollTop: targetOffset }, 1000); //set scroll speed here
	                return false;
	            }
	        }
	    });
	};

	Frontend.getBootstrapEnvironment = function() {
	    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
	    var envValues = ["xs", "sm", "md", "lg"];

	    var $el = $('<div>');
	    $el.appendTo($('body'));

	    for (var i = envValues.length - 1; i >= 0; i--) {
	        var envVal = envValues[i];
	        $el.addClass('hidden-'+envVal);
	        if ($el.is(':hidden')) {
	            $el.remove();
	            return envs[i]
	        }
	    }
	};

})(window, document,jQuery,skrollr);


$(document).ready(function(){

	Frontend.init();

});

var trackOutboundLink = function(url) {
   ga('send', 'event', 'external', 'click', url, {'hitCallback':
     function () {
     document.location = url;
     }
   });
}

