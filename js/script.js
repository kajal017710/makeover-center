/*
Template Name: Lisa - Wellness Center, Spa and Beauty Salon Template
Author       : Abubakar Siddique
Version      : 1.1
*/
(function($)
{
	"use strict";
	
	
	// preloader 
	$(window).on('load', function() {
		preloader();
	})
	
	$(document).on('ready', function () {
		
		// Dropdown menu 
		$('.dropdown').on('mouseenter', function () {
			$(this).addClass('open');
		});
		$(".dropdown").on('mouseleave', function () {
			$(this).removeClass('open');
		});
		
		//Masonry Grid 
		$('.grid').masonry({
			itemSelector: '.grid-item',
			percentPosition: true,
			columnWidth: '.grid-item'
		}); 
		
		//Header Fixed 
		$('.navbar-static-top').affix({
			  offset: {
				top: $('.top-bar').outerHeight()
			  }
		});	
		
		var pageBoby = $('body');
		var topBar=$('.top-bar').outerHeight();
		$(window).on('scroll', function() {
			if ($(this).scrollTop() >= topBar) {
				pageBoby.addClass("f-header");
			} else {
				pageBoby.removeClass("f-header");
			}
		});
		
		// Animation
		 if($('.wow').length){
			var wow = new WOW(
			  {
				boxClass:     'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset:       0,          // distance to the element when triggering the animation (default is 0)
				mobile:       true,       // trigger animations on mobile devices (default is true)
				live:         true       // act on asynchronously loaded content (default is true)
			  }
			);
			wow.init();
		}
		
		// Services Carousel 
		$("#services-carousel").owlCarousel({
			autoplay: true,
			autoplayTimeout:2000,
			margin:30,
			nav: false,
			smartSpeed:1000,
			dots:true,
			autoplayHoverPause:false,
			loop:true,
			responsiveClass: true,
			responsive: {
			  0: {
				items: 1,
			  },
			  600: {
				items: 2,
			  },
			  768: {
				items: 3,
			  },
			  1200: {
				items: 3,
			  }
			}
		 });
		
		//Custom select box
		$('.select-option').chosen({disable_search_threshold:10});
		
		//Datepicker
		$( ".date-pic" ).datepicker({
			todayBtn: "linked",
			keyboardNavigation: false,
			forceParse: false,
			calendarWeeks: true,
			autoclose: true,
			format: 'mm/dd/yyyy'
		});
		
		//Timepicker
        $(".timepicker").timepicker({
        	showInputs: false
        });
		
		// Gallery Filter
		$('.gallery-item').mixitup({
			targetSelector: '.gallery',
			transitionSpeed: 450
		});
		
		// Fancybox
		$('a.fancybox').fancybox();
		
		//Contact Map
		var mapInfo = {"lat":"40.7127837", "lon":"-90.90594130000002"}; //Change a map coordinate here!
		try {
			$('.map').gmap3({
				action: 'addMarker',
				latLng: [mapInfo.lat, mapInfo.lon],
				map:{
					center: [mapInfo.lat, mapInfo.lon],
					zoom: 5
					},
				},
				{action: 'setOptions', args:[{scrollwheel:false}]}
			);
		} catch(err) {

		}
		
		// Counter Up 
		$('.counter').counterUp({
			delay: 10,
			time: 2000
		});
		
		// Back to top 
		$(".back-top").hide();
		
		$('.back-top a').on('click', function(event) {
			$('body,html').animate({scrollTop:0},800);
			return false;
		});
		
		// Background Scrolling
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				 
		} else {
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true
			});
		}
	});
	
	$(window).on('scroll', function() {
	// Progressbar 
		$(".single-progressbar").each(function() {
			var base = $(this);
			var windowHeight = $(window).height();
			var itemPos = base.offset().top;
			var scrollpos = $(window).scrollTop() + windowHeight - 100;
			if (itemPos <= scrollpos) {
				var auptcoun = base.find(".progress-bar").attr("aria-valuenow");
				base.find(".progress-bar").css({
					"width": auptcoun + "%"
				});
				var str = base.find(".skill-per").text();
				var res = str.replace("%", "");
				if (res == 0) {
					$({
						countNumber: 0
					}).animate({
						countNumber: auptcoun
					}, {
						duration: 1500,
						easing: 'linear',
						step: function() {
							base.find(".skill-per").text(Math.ceil(this.countNumber) + "%");
						}
					});
				}
			}
		});	
	
		
	// Back to top
		if($(this).scrollTop()>150){
			$('.back-top').fadeIn();
		}
		else{
			$('.back-top').fadeOut();
		}
		
		
	});
	
	// Preload
	function preloader(){
		$(".preloaderimg").fadeOut();
		$(".preloader").delay(200).fadeOut("slow").delay(200, function(){
			$(this).remove();
		});
	}
		
	// Slider Caption Animation 
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';
		
		elems.each(function () {
			var $this = $(this),
				$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
	
	//Variables on page load 
	var $myCarousel = $('#banner'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
		
	//Initialize carousel 
	$myCarousel.carousel();
	
	//Animate captions in first slide on page load 
	doAnimations($firstAnimatingElems);
	
	//Pause carousel  
	$myCarousel.carousel('pause');
	
	
	//Other slides to be animated on carousel slide event 
	$myCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	}); 
	
	// modal vertical
	function centerModals($element) {
		  var $modals;
		  if ($element.length) {
			$modals = $element;
		  } else {
			$modals = $('.modal-vcenter:visible');
		  }
		  $modals.each( function(i) {
			var $clone = $(this).clone().css('display', 'block').appendTo('body');
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
			top = top > 0 ? top : 0;
			$clone.remove();
			$(this).find('.modal-content').css("margin-top", top);
		  });
	}
		
	$('.modal-vcenter').on('show.bs.modal', function(e) {
	  centerModals($(this));
	});
	$(window).on('resize', centerModals);
	
})(jQuery);	
	
