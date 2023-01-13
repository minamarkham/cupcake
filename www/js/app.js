$(document).ready(function(){

// -----------------------------------------------------  NAV MOVEMENT
	$("nav").sticky({ topSpacing: 0});

// -----------------------------------------------------  FANCYBOX
	$(".fancybox").fancybox({
		padding: 0,
		openEffect : 'elastic',
		openSpeed  : 150,
		closeEffect : 'elastic',
		closeSpeed  : 150,
		closeClick : true,
	    helpers : {
	    	title : {
					type : 'outside'
					},
	        overlay : {
	            css : {
	                'background' : 'rgba(0,0,0,.85)'
	            }
	        }
	    }
	});

// -----------------------------------------------------  PAGE SCROLL
	$('ul.menu').onePageNav();
	$('#header a').smoothScroll();

	$('a.enter').mouseenter(function(e) {
        $("a.enter").animate({padding:15+"px", opacity:0.7});
    });
	$('a.enter').mouseleave(function(e) {
        $("a.enter").animate({padding:10+"px", opacity:1});
    });

// -----------------------------------------------------  TWITTER
	getTwitters('tweet', {
		id: 'minamarkham',
		count: 1,
		enableLinks: true,
		ignoreReplies: true,
		clearContents: true,
		template: '%text%<br/><i class="icon-twitter"></i> <span class="twitter-date"><a href="http://twitter.com/%user_screen_name%/statuses/%id_str%/">%time%</a></span>'});

// -----------------------------------------------------  MASONRY
  $(function(){
    var $container = $('#thumbs');
    $container.imagesLoaded( function(){
      $container.masonry({
        itemSelector : '.item',
        isAnimated: true,
        gutterWidth: 0,
        columnWidth: function( containerWidth ) {
	        return containerWidth / 6;
	    }
      });
    });
  });

// -----------------------------------------------------  ROYAL SLIDER
  $('#slides').royalSlider({
    autoHeight: true,
    arrowsNav: true,
    arrowsNavAutoHide: false,
    fadeinLoadedSlide: false,
    controlNavigation: 'none',
    loop: false,
    loopRewind: true,
    keyboardNavEnabled: true
  });

// -----------------------------------------------------  HEADER - HEIGHT
	function header() {
		var windowHeight = $(window).height();
		var windowHeight2 = $(window).height();
		var header = $("#header");
		header.css("height",windowHeight+"px");

	}
	header();

	$(window).resize(function(){
		header();
		navi();
	});


	$(window).bind('scroll', function(){
		navi();
	});

	$('#nav').hide();
	$('#nav ul').fadeOut();
	$('#nav ul.social').fadeOut();
	$('.foot-social').fadeOut();

	function navi(){
		if ($(window).scrollTop() >= $(window).height()){
			if(!$('#nav').is(':animated')) {

			$('#nav').stop(true,true).slideDown(500, function(){

				if($(window).width() < 767){
					$('#nav ul.menu').fadeIn();
					$('#nav ul.social').fadeOut(10);
					$('.foot-social').fadeIn();
				}
				else{
					$('#nav ul').fadeIn();
					$('.foot-social').fadeOut();
				}
			});

		}
		}else{
			if(!$('#nav').is(':animated')) {

					$('#nav ul').fadeOut(function(){
						$('#nav').stop(true,true).slideUp(500);
					});
			}
		}
	}

// -----------------------------------------------------  SKILLS CHART

	$('#Adobe').animate( { height: '90%' }, 2500);
	$('#HTML5').animate( { height: '85%' }, 2500);
	$('#CSS3').animate( { height: '90%' }, 2500);
	$('#WordPress').animate( { height: '55%' }, 2500);
	$('#EE').animate( { height: '30%' }, 2500);
	$('#jQuery').animate( { height: '35%' }, 2500);
	$('#Sass').animate( { height: '60%' }, 2500);
	$('#PHP').animate( { height: '10%' }, 2500);
	$('#Baking').animate( { height: '110%' }, 2500);

	$('#services').find('.tooltip').hover(function() {
		var tip = $(this).attr('title');
		$(this).attr('title', '');
		$(this).parent().append('<div id="tooltip">' + tip + '</div>');
		$('#tooltip').css('left', '0').fadeIn(200).animate({
			'left': '10px'
		}, {
			duration: 200,
			queue: false
		});
		$('#tooltip').fadeTo('10', 0.9);
	}, function() {
		$(this).attr('title', $('#tooltip').html());
		$(this).parent().children('#tooltip').remove();
	});

// -----------------------------------------------------  COPYRIGHT

	$("#year").text( (new Date).getFullYear() );

// -----------------------------------------------------  I AM STATEMENTS

	// custom jquery plugin loadText()
	$.fn.randomText = function( textArray, interval, randomEle, prevText ) {
	  var obj = $(this);
	  if( $('#statement').length == 0 ){ obj.append('<div id="statement">'); }
	  var textCont = $('#statement');
	  if( typeof randomEle != 'undefined' ){ if( $('#refresh').length == 0 ){ obj.append('<a href="javascript:;" id="refresh"><em>' + randomEle ); } }
	  textCont.fadeOut( 'slow', function() {
	    var chosenText = random_array( textArray );
	    while( chosenText == prevText ) { chosenText = random_array( textArray ); }
	    textCont.empty().html( chosenText );
	    textCont.fadeIn( 'slow' );
	    sendText = chosenText;
	  });
	  timeOut = setTimeout( function(){ obj.randomText( textArray, interval, randomEle, sendText ); }, interval );
	  $("#refresh").click( function(){
	      if( !textCont.is(':animated') ) { clearTimeout( timeOut ); obj.randomText( textArray, interval, randomEle, sendText );} // animation check prevents "too much recursion" error in jQuery
	  });
	}

	//public function
	function random_array( aArray ) {
	  var rand = Math.floor( Math.random() * aArray.length + aArray.length );
	  var randArray = aArray[ rand - aArray.length ];
	  return randArray;
	}
	var textArray = [
	  '<span class="amp">{</span>&nbsp;here&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;<a href="#contact">looking for work!</a>&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;a front-end architect&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;a geek in pink&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;a brown skin lady&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;<a href="http://www.buzzfeed.com/kmallikarjuna/27-signs-youre-a-browncoat">a browncoat</a>&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;a maker of the interwebs&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;<a href="http://www.personalitypage.com/INFP.html">an INFP</a>&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;a <a href="http://sexyfeminist.com/">sexy feminist</a>&nbsp;<span class="amp">}</span>',
	  //'<span class="amp">{</span>&nbsp;<a href="/evolving/">evolving</a>&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;<a href="/supersingle/">super single</a>&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;<a href="/rambling/">rambling</a>&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;<a href="/baking/">a baker of cupcakes</a>&nbsp;<span class="amp">}</span>',
	  //'<span class="amp">{</span>&nbsp;<a href="/helpful/">helpful</a>&nbsp;<span class="amp">}</span>',
	  '<span class="amp">{</span>&nbsp;<a href="http://lanyrd.com/profile/minamarkham/">a speaker</a>&nbsp;<span class="amp">}</span>',
	];
	$('#statement').randomText( textArray, 3000 ); // ( array, interval )
	//$('#refresh').on(clickEvent, Application.remark.spin);


}); // end of document ready