/* PLUGIN DIRECTORY
What you can find in this file [listed in order they appear]

	Sticky Plugin (http://labs.anthonygarand.com/sticky)
	One Page Nav (http://github.com/davist11/jQuery-One-Page-Nav)
	jQuery.ScrollTo (http://flesler.blogspot.com/2007/10/jqueryscrollto.html)
  Smooth Scroll (https://github.com/kswedberg/jquery-smooth-scroll)
	Fancybox (http://fancyapps.com/fancybox/)
	Parallax (http://www.ianlunn.co.uk/blog/code-tutorials/recreate-nikebetterworld-parallax/)
	Inview (http://remysharp.com/2009/01/26/element-in-view-event-plugin/)
	Query Form (http://malsup.com/jquery/form/)
  Royal Slider (http://dimsemenov.com/plugins/royal-slider)
  Twitter JS (http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/)

*/

// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper'
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function() {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;
                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement
                            .css('position', '')
                            .css('top', '')
                            .removeClass(s.className);
                        s.stickyElement.parent().removeClass(s.className);
                        s.currentTop = null;
                    }
                }
                else {
                    var newTop = documentHeight - s.stickyElement.outerHeight()
                        - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop != newTop) {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .addClass(s.className);
                        s.stickyElement.parent().addClass(s.className);
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();
        },
        methods = {
            init: function(options) {
                var o = $.extend(defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);

                    stickyId = stickyElement.attr('id');
                    wrapper = $('<div></div>')
                        .attr('id', stickyId + '-sticky-wrapper')
                        .addClass(o.wrapperClassName);
                    stickyElement.wrapAll(wrapper);
                    var stickyWrapper = stickyElement.parent();
                    stickyWrapper.css('height', stickyElement.outerHeight());
                    sticked.push({
                        topSpacing: o.topSpacing,
                        bottomSpacing: o.bottomSpacing,
                        stickyElement: stickyElement,
                        currentTop: null,
                        stickyWrapper: stickyWrapper,
                        className: o.className
                    });
                });
            },
            update: scroller
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function() {
        setTimeout(scroller, 0);
    });
})(jQuery);

/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 2.1
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

	// our plugin constructor
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$nav = this.$elem.find('a');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 850,
			scrollOffset: 45,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			var self = this;

			// Introduce defaults that can be extended either
			// globally or using an object literal.
			self.config = $.extend({}, self.defaults, self.options, self.metadata);

			//Filter any links out of the nav
			if(self.config.filter !== '') {
				self.$nav = self.$nav.filter(self.config.filter);
			}

			//Handle clicks on the nav
			self.$nav.on('click.onePageNav', $.proxy(self.handleClick, self));

			//Get the section positions
			self.getPositions();

			//Handle scroll changes
			self.bindInterval();

			//Update the positions on resize too
			self.$win.on('resize.onePageNav', $.proxy(self.getPositions, self));

			return this;
		},

		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function() {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});

			self.t = setInterval(function() {
				docHeight = self.$doc.height();

				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},

		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;

			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				topPos = $('#' + linkHref).offset().top;

				self.sections[linkHref] = Math.round(topPos) - self.config.scrollOffset;
			});
		},

		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},

		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);

			if(!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if(self.config.begin) {
					self.config.begin();
				}

				//Change the highlighted nav item
				self.adjustNav(self, $parent);

				//Removing the auto-adjust on scroll
				self.unbindInterval();

				//Scroll to the correct position
				$.scrollTo(newLoc, self.config.scrollSpeed, {
					axis: 'y',
					easing: self.config.easing,
					offset: {
						top: -self.config.scrollOffset
					},
					onAfter: function() {
						//Do we need to change the hash?
						if(self.config.changeHash) {
							window.location.hash = newLoc;
						}

						//Add the auto-adjust on scroll back in
						self.bindInterval();

						//End callback
						if(self.config.end) {
							self.config.end();
						}
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();

				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);

					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},

		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};

})( jQuery, window , document );

/**
 * Scroll.To
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(!e)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/*! Smooth Scroll - v1.4.5 - 2012-07-22
* Copyright (c) 2012 Karl Swedberg; Licensed MIT, GPL */

(function($) {

var version = '1.4.5',
    defaults = {
      exclude: [],
      excludeWithin:[],
      offset: -45,
      direction: 'top', // one of 'top' or 'left'
      scrollElement: null, // jQuery set of elements you wish to scroll (for $.smoothScroll).
                          //  if null (default), $('html, body').firstScrollable() is used.
      scrollTarget: null, // only use if you want to override default behavior
      beforeScroll: function() {},  // fn(opts) function to be called before scrolling occurs. "this" is the element(s) being scrolled
      afterScroll: function() {},   // fn(opts) function to be called after scrolling occurs. "this" is the triggering element
      easing: 'swing',
      speed: 1000,
      autoCoefficent: 2 // coefficient for "auto" speed
    },

    getScrollable = function(opts) {
      var scrollable = [],
          scrolled = false,
          dir = opts.dir && opts.dir == 'left' ? 'scrollLeft' : 'scrollTop';

      this.each(function() {

        if (this == document || this == window) { return; }
        var el = $(this);
        if ( el[dir]() > 0 ) {
          scrollable.push(this);
        } else {
          // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
          el[dir](1);
          scrolled = el[dir]() > 0;
          // then put it back, of course
          el[dir](0);
          if ( scrolled ) {
            scrollable.push(this);
          }
        }
      });

      if ( opts.el === 'first' && scrollable.length ) {
        scrollable = [ scrollable[0] ];
      }

      return scrollable;
    },
    isTouch = 'ontouchend' in document;

$.fn.extend({
  scrollable: function(dir) {
    var scrl = getScrollable.call(this, {dir: dir});
    return this.pushStack(scrl);
  },
  firstScrollable: function(dir) {
    var scrl = getScrollable.call(this, {el: 'first', dir: dir});
    return this.pushStack(scrl);
  },

  smoothScroll: function(options) {
    options = options || {};
    var opts = $.extend({}, $.fn.smoothScroll.defaults, options),
        locationPath = $.smoothScroll.filterPath(location.pathname);

    this
    .unbind('click.smoothscroll')
    .bind('click.smoothscroll', function(event) {
      var link = this,
          $link = $(this),
          exclude = opts.exclude,
          excludeWithin = opts.excludeWithin,
          elCounter = 0, ewlCounter = 0,
          include = true,
          clickOpts = {},
          hostMatch = ((location.hostname === link.hostname) || !link.hostname),
          pathMatch = opts.scrollTarget || ( $.smoothScroll.filterPath(link.pathname) || locationPath ) === locationPath,
          thisHash = escapeSelector(link.hash);

      if ( !opts.scrollTarget && (!hostMatch || !pathMatch || !thisHash) ) {
        include = false;
      } else {
        while (include && elCounter < exclude.length) {
          if ($link.is(escapeSelector(exclude[elCounter++]))) {
            include = false;
          }
        }
        while ( include && ewlCounter < excludeWithin.length ) {
          if ($link.closest(excludeWithin[ewlCounter++]).length) {
            include = false;
          }
        }
      }

      if ( include ) {
        event.preventDefault();

        $.extend( clickOpts, opts, {
          scrollTarget: opts.scrollTarget || thisHash,
          link: link
        });

        $.smoothScroll( clickOpts );
      }
    });

    return this;

  }
});

$.smoothScroll = function(options, px) {
  var opts, $scroller, scrollTargetOffset, speed,
      scrollerOffset = 0,
      offPos = 'offset',
      scrollDir = 'scrollTop',
      aniProps = {},
      aniOpts = {},
      useScrollTo = false,
      scrollprops = [];

  if ( typeof options === 'number') {
    opts = $.fn.smoothScroll.defaults;
    scrollTargetOffset = options;
  } else {
    opts = $.extend({}, $.fn.smoothScroll.defaults, options || {});
    if (opts.scrollElement) {
      offPos = 'position';
      if (opts.scrollElement.css('position') == 'static') {
        opts.scrollElement.css('position', 'relative');
      }
    }

    scrollTargetOffset = px ||
                        ( $(opts.scrollTarget)[offPos]() &&
                        $(opts.scrollTarget)[offPos]()[opts.direction] ) ||
                        0;
  }

  opts = $.extend({link: null}, opts);
  scrollDir = opts.direction == 'left' ? 'scrollLeft' : scrollDir;

  if ( opts.scrollElement ) {
    $scroller = opts.scrollElement;
    scrollerOffset = $scroller[scrollDir]();
  } else {
    $scroller = $('html, body').firstScrollable();
    useScrollTo = isTouch && 'scrollTo' in window;
  }

  aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;

  opts.beforeScroll.call($scroller, opts);

  if ( useScrollTo ) {
    scrollprops = (opts.direction == 'left') ? [aniProps[scrollDir], 0] : [0, aniProps[scrollDir]];
    window.scrollTo.apply(window, scrollprops);
    opts.afterScroll.call(opts.link, opts);

  } else {
    speed = opts.speed;

    // automatically calculate the speed of the scroll based on distance / coefficient
    if (speed === 'auto') {

      // if aniProps[scrollDir] == 0 then we'll use scrollTop() value instead
      speed = aniProps[scrollDir] || $scroller.scrollTop();

      // divide the speed by the coefficient
      speed = speed / opts.autoCoefficent;
    }

    aniOpts = {
      duration: speed,
      easing: opts.easing,
      complete: function() {
        opts.afterScroll.call(opts.link, opts);
      }
    };

    if (opts.step) {
      aniOpts.step = opts.step;
    }

    $scroller.stop().animate(aniProps, aniOpts);
  }
};

$.smoothScroll.version = version;
$.smoothScroll.filterPath = function(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
};

// default options
$.fn.smoothScroll.defaults = defaults;

function escapeSelector (str) {
  return str.replace(/(:|\.)/g,'\\$1');
}

})(jQuery);

/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.3 (Tue, 23 Oct 2012)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		didUpdate = null,
		isTouch	  = document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.3',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'fade', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'fade', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					$('body').unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						$('body').bind({
							'afterShow.player onUpdate.player'   : set,
							'onCancel.player beforeClose.player' : stop,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						opts = $.extend(true, {}, F.helpers[helper].defaults, opts);

						F.helpers[helper][event](opts, obj);
					}
				});
			}

			$.event.trigger(event + '.fb');
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width;
				F.coming.height = this.height;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.height();
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind( isTouch ? 'touchstart.fb' : 'click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : function() {
						// This helps FireFox to properly render the box
						setTimeout(F._afterZoomIn, 20);
					}
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,  // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,   // duration of fadeOut animation
			showEarly  : true,  // indicates if should be opened immediately or wait until the content is ready
			css        : {},    // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true   // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,   // current handle
		fixed   : false,  // indicates if the overlay has position "fixed"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( 'body' );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			$('.fancybox-overlay').remove();

			W.unbind('resize.overlay');

			this.overlay = null;

			if (this.margin !== false) {
				$('body').css('margin-right', this.margin);

				this.margin = false;
			}

			if (this.el) {
				this.el.removeClass('fancybox-lock');
			}
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if ($.browser.msie) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			$('.fancybox-overlay').stop(true, true);

			if (!this.overlay) {
				this.margin = D.height() > W.height() || $('body').css('overflow-y') === 'scroll' ? $('body').css('margin-right') : false;
				this.el     = document.all && !document.querySelector ? $('html') : $('body');

				this.create(opts);
			}

			if (opts.locked && this.fixed) {
				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			if (obj.locked) {
				this.el.addClass('fancybox-lock');

				if (this.margin !== false) {
					$('body').css('margin-right', getScalar( this.margin ) + obj.scrollbarWidth);
				}
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			if (this.overlay && !F.isActive) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if ($.browser.msie) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});
	});

}(window, document, jQuery));


/*
Demo: Despiration Tutorial Parallax Demo
Author: Elias Ghosn - Despiration.com
Author URL: http://www.despiration.com/
Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/recreate-nikebetterworld-parallax/

License: http://creativecommons.org/licenses/by-sa/3.0/ (Attribution Share Alike). Please attribute work to Despiration.com simply by leaving these comments in the source code or if you'd prefer, place a link on your website to http://www.despiration.com/.

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

$(document).ready(function() { //when the document is ready...


	//save selectors as variables to increase performance
	var $window = $(window);
	var $firstBG = $('#parallax1');
	var bg1 = $("#parallax1 .bg1");
	var $secondBG = $('#parallax2');
	var bg2 = $("#parallax2 .bg2");
	var $thirdBG = $('#parallax3');
	var bg3 = $("#parallax3 .bg3");

	var windowHeight = $window.height(); //get the height of the window


	//apply the class "inview" to a section that is in the viewport
	$('#parallax1,#parallax2,#parallax3').bind('inview', function (event, visible) {
			if (visible == true) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
			}
		});


	//function that places the navigation in the center of the window
	function RepositionNav(){
		var windowHeight = $window.height(); //get the height of the window
		//var navHeight = $('#nav').height() / 2;
		var windowCenter = (windowHeight / 2);
		//var newtop = windowCenter - navHeight;
		//$('#nav').css({"top": newtop}); //set the new top position of the navigation list
	}

	//function that is called for every pixel the user scrolls. Determines the position of the background
	/*arguments:
		x = horizontal position of background
		windowHeight = height of the viewport
		pos = position of the scrollbar
		adjuster = adjust the position of the background
		inertia = how fast the background moves in relation to scrolling
	*/
	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}

	//function to be called whenever the window is scrolled or resized
	function Move(){
		var pos = $window.scrollTop(); //position of the scrollbar

		//if the first section is in view...
		if($firstBG.hasClass("inview")){
			//call the newPos function and change the background position
			$firstBG.css({'backgroundPosition': newPos(0, windowHeight, pos, 1500, 0)});
			//call the newPos function and change the second background position
			bg1.css({'backgroundPosition': newPos(50, windowHeight, pos, 2950, 0.2)});
		}

		//if the second section is in view...
		if($secondBG.hasClass("inview")){
			//call the newPos function and change the background position
			$secondBG.css({'backgroundPosition': newPos(0, windowHeight, pos, 1400, 0)});
			//$secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1550, 0.3)});
			bg2.css({'backgroundPosition': newPos(50, windowHeight, pos, 4410, 0.2)});
			//call the newPos function and change the second background position
		}

		if ($thirdBG.hasClass("inview")){
			//call the newPos function and change the background position
			$thirdBG.css({'backgroundPosition': newPos(0, windowHeight, pos, 2000, 0)});
			//$secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1550, 0.3)});
			bg3.css({'backgroundPosition': newPos(50, windowHeight, pos, 5510, 0.2)});
			//call the newPos function and change the second background position
		}

		$('#pixels').html(pos); //display the number of pixels scrolled at the bottom of the page
	}

	RepositionNav(); //Reposition the Navigation to center it in the window when the script loads

	$window.resize(function(){ //if the user resizes the window...
		Move(); //move the background images in relation to the movement of the scrollbar
		RepositionNav(); //reposition the navigation list so it remains vertically central
	});

	$window.bind('scroll', function(){ //when the user is scrolling...
		Move(); //move the background images in relation to the movement of the scrollbar
	});

});

/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });

    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);

/*
 * jQuery Form Plugin
 * version: 2.12 (06/07/2008)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */
(function($) {

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function() {
            $(this).ajaxSubmit({
                target: '#output'
            });
            return false; // <-- important!
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    if (typeof options == 'function')
        options = { success: options };

    options = $.extend({
        url:  this.attr('action') || window.location.toString(),
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
   }

    var a = this.formToArray(options.semantic);
    if (options.data) {
        options.extraData = options.data;
        for (var n in options.data)
            a.push( { name: n, value: options.data[n] } );
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else
        options.data = q; // data is the query string for 'post'

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i](data, status, $form);
    };

    // are there files to upload?
    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j])
            found = true;

    // options.iframe allows user to force iframe mode
   if (options.iframe || found) {
       // hack to fix Safari hang (thanks to Tim Molendijk for this)
       // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
       if ($.browser.safari && options.closeKeepAlive)
           $.get(options.closeKeepAlive, fileUpload);
       else
           fileUpload();
       }
   else
       $.ajax(options);

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;


    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUpload() {
        var form = $form[0];

        if ($(':input[@name=submit]', form).length) {
            alert('Error: Form elements must not be named "submit".');
            return;
        }

        var opts = $.extend({}, $.ajaxSettings, options);

        var id = 'jqFormIO' + (new Date().getTime());
        var $io = $('<iframe id="' + id + '" name="' + id + '" />');
        var io = $io[0];

        if ($.browser.msie || $.browser.opera)
            io.src = 'javascript:false;document.write("");';
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {}
        };

        var g = opts.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);

        var cbInvoked = 0;
        var timedOut = 0;

        // add submitting element to data if we know it
        var sub = form.clk;
        if (sub) {
            var n = sub.name;
            if (n && !sub.disabled) {
                options.extraData = options.extraData || {};
                options.extraData[n] = sub.value;
                if (sub.type == "image") {
                    options.extraData[name+'.x'] = form.clk_x;
                    options.extraData[name+'.y'] = form.clk_y;
                }
            }
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        setTimeout(function() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');
            $form.attr({
                target:   id,
                encoding: 'multipart/form-data',
                enctype:  'multipart/form-data',
                method:   'POST',
                action:   opts.url
            });

            // support timout
            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (options.extraData)
                    for (var n in options.extraData)
                        extraInputs.push(
                            $('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
                                .appendTo(form)[0]);

                // add iframe to doc and submit the form
                $io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
                $form.attr('action', a);
                t ? $form.attr('target', t) : $form.removeAttr('target');
                $(extraInputs).remove();
            }
        }, 10);

        function cb() {
            if (cbInvoked++) return;

            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var operaHack = 0;
            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;

                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;

                if (doc.body == null && !operaHack && $.browser.opera) {
                    // In Opera 9.2.x the iframe DOM is not always traversable when
                    // the onload callback fires so we give Opera 100ms to right itself
                    operaHack = 1;
                    cbInvoked--;
                    setTimeout(cb, 100);
                    return;
                }

                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': opts.dataType};
                    return headers[header];
                };

                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    xhr.responseText = ta ? ta.value : xhr.responseText;
                }
                else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                    xhr.responseXML = toXml(xhr.responseText);
                }
                data = $.httpData(xhr, opts.dataType);
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            // clean up
            setTimeout(function() {
                $io.remove();
                xhr.responseXML = null;
            }, 100);
        };

        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var $form = this.form;
            $form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    $form.clk_x = e.offsetX;
                    $form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    $form.clk_x = e.pageX - offset.left;
                    $form.clk_y = e.pageY - offset.top;
                } else {
                    $form.clk_x = e.pageX - this.offsetLeft;
                    $form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { $form.clk = $form.clk_x = $form.clk_y = null; }, 10);
        });
    });
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        var inputs = form.getElementsByTagName("input");
        for(var i=0, max=inputs.length; i < max; i++) {
            var input = inputs[i];
            var n = input.name;
            if(n && !input.disabled && input.type == "image" && form.clk == input)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                // extra pain for IE...
                var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b == undefined) b = true;
    return this.each(function() {
        this.disabled = !b
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.select = function(select) {
    if (select == undefined) select = true;
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').select(false);
            }
            this.selected = select;
        }
    });
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
    if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
        window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);

// jquery.royalslider v9.2.0
(function(k){function t(b,e){var c=navigator.userAgent.toLowerCase(),g=k.browser,a=this,f=g.webkit;c.indexOf("android");a.isIPAD=c.match(/(ipad)/);for(var d=document.createElement("div").style,i=["webkit","Moz","ms","O"],h="",j=0,m,c=0;c<i.length;c++)m=i[c],!h&&m+"Transform"in d&&(h=m),m=m.toLowerCase(),window.requestAnimationFrame||(window.requestAnimationFrame=window[m+"RequestAnimationFrame"],window.cancelAnimationFrame=window[m+"CancelAnimationFrame"]||window[m+"CancelRequestAnimationFrame"]);
window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-j)),d=window.setTimeout(function(){a(b+c)},c);j=b+c;return d});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});a.slider=k(b);a.ev=k({});a._a=k(document);a.st=k.extend({},k.fn.royalSlider.defaults,e);a._b=a.st.transitionSpeed;if(a.st.allowCSS3&&(!f||a.st.allowCSS3OnWebkit))c=h+(h?"T":"t"),a._c=c+"ransform"in d&&c+"ransition"in d,a._c&&(a._d=h+
(h?"P":"p")+"erspective"in d);h=h.toLowerCase();a._e="-"+h+"-";a._f="vertical"===a.st.slidesOrientation?!1:!0;a._g=a._f?"left":"top";a._h=a._f?"width":"height";a._i=-1;a._j="fade"===a.st.transitionType?!1:!0;a._j||(a.st.sliderDrag=!1,a._k=10);a._l=0;a._m=0;k.each(k.rsModules,function(b,c){c.call(a)});a.slides=[];a._n=0;(a.st.slides?k(a.st.slides):a.slider.children().detach()).each(function(){a._o(this,true)});a.st.randomizeSlides&&a.slides.sort(function(){return 0.5-Math.random()});a.numSlides=a.slides.length;
a._p();a.st.startSlideId>a.numSlides-1&&(a.st.startSlideId=a.numSlides-1);a.staticSlideId=a.currSlideId=a._q=a.st.startSlideId;a.currSlide=a.slides[a.currSlideId];a._r=0;a.slider.addClass((a._f?"rsHor":"rsVer")+(a._j?"":" rsFade"));d='<div class="rsOverflow"><div class="rsContainer">';a.slidesSpacing=a.st.slidesSpacing;a._s=(a._f?a.slider.width():a.slider.height())+a.st.slidesSpacing;a._t=Boolean(0<a._u);1>=a.numSlides&&(a._v=!1);a._w=a._v&&a._j?2===a.numSlides?1:2:0;a._x=6>a.numSlides?a.numSlides:
6;a._y=0;a._z=0;a.slidesJQ=[];for(c=0;c<a.numSlides;c++)a.slidesJQ.push(k('<div style="'+(a._j?"":c!==a.currSlideId?"z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;":"z-index: 0;  position: absolute; left: 0; top: 0;")+'" class="rsSlide "></div>'));a.slider.html(d+"</div></div>");a._a1=a.slider.children(".rsOverflow");a._b1=a._a1.children(".rsContainer");a._c1=k('<div class="rsPreloader"></div>');c=a._b1.children(".rsSlide");a._d1=a.slidesJQ[a.currSlideId];a._e1=0;"ontouchstart"in
window||"createTouch"in document?(a.hasTouch=!0,a._f1="touchstart.rs",a._g1="touchmove.rs",a._h1="touchend.rs",a._i1="touchcancel.rs",a._j1=0.5):(a.hasTouch=!1,a._j1=0.2,a.st.sliderDrag&&(g.msie||g.opera?a._k1=a._l1="move":g.mozilla?(a._k1="-moz-grab",a._l1="-moz-grabbing"):f&&-1!=navigator.platform.indexOf("Mac")&&(a._k1="-webkit-grab",a._l1="-webkit-grabbing"),a._m1()),a._f1="mousedown.rs",a._g1="mousemove.rs",a._h1="mouseup.rs",a._i1="mouseup.rs");a._c?(a._n1="transition-property",a._o1="transition-duration",
a._p1="transition-timing-function",a._q1=a._r1=a._e+"transform",a._d?(f&&a.slider.addClass("rsWebkit3d"),a._s1="translate3d(",a._t1="px, ",a._u1="px, 0px)"):(a._s1="translate(",a._t1="px, ",a._u1="px)"),a._j)?a._b1[a._e+a._n1]=a._e+"transform":(g={},g[a._e+a._n1]="opacity",g[a._e+a._o1]=a.st.transitionSpeed+"ms",g[a._e+a._p1]=a.st.css3easeInOut,c.css(g)):(a._r1="left",a._q1="top");var l;k(window).on("resize.rs",function(){l&&clearTimeout(l);l=setTimeout(function(){a.updateSliderSize()},50)});a.ev.trigger("rsAfterPropsSetup");
a.updateSliderSize();a.st.keyboardNavEnabled&&a._v1();a.st.arrowsNavHideOnTouch&&a.hasTouch&&(a.st.arrowsNav=!1);a.st.arrowsNav&&(g=a.st.controlsInside?a._a1:a.slider,k('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(g),a._w1=g.children(".rsArrowLeft").click(function(b){b.preventDefault();a.prev()}),a._x1=g.children(".rsArrowRight").click(function(b){b.preventDefault();a.next()}),a.st.arrowsNavAutoHide&&
!a.hasTouch&&(a._w1.addClass("rsHidden"),a._x1.addClass("rsHidden"),g.one("mousemove.arrowshover",function(){a._w1.removeClass("rsHidden");a._x1.removeClass("rsHidden")}),g.hover(function(){if(!a._y1){a._w1.removeClass("rsHidden");a._x1.removeClass("rsHidden")}},function(){if(!a._y1){a._w1.addClass("rsHidden");a._x1.addClass("rsHidden")}})),a.ev.on("rsOnUpdateNav",function(){a._z1()}),a._z1());a._a2=!a.hasTouch&&a.st.sliderDrag||a.hasTouch&&a.st.sliderTouch;if(a._a2)a._b1.on(a._f1,function(b){a._b2(b)});
else a.dragSuccess=!1;var q=["rsPlayBtnIcon","rsPlayBtn","rsCloseVideoBtn","rsCloseVideoIcn"];a._b1.click(function(b){if(!a.dragSuccess){var c=k(b.target).attr("class");if(k.inArray(c,q)!==-1&&a.toggleVideo())return false;if(a.st.navigateByClick&&!a._c2){if(k(b.target).closest(".rsNoDrag",a._d1).length)return true;a._d2(b)}}});a.ev.trigger("rsAfterInit")}k.rsModules||(k.rsModules={});t.prototype={_d2:function(b){b[this._f?"pageX":"pageY"]-this._e2>0?this.next():this.prev()},_p:function(){var b;b=
this.st.numImagesToPreload;if(this._v=this.st.loop)if(this.numSlides===2){this._v=false;this.st.loopRewind=true}else if(this.numSlides<2)this.st.loopRewind=this._v=false;this._v&&b>0&&(this.numSlides<=4?b=1:this.st.numImagesToPreload>(this.numSlides-1)/2&&(b=Math.floor((this.numSlides-1)/2)));this._u=b},_o:function(b,e){function c(b,c){a.image=b.attr(!c?"src":c);a.caption=!c?b.attr("alt"):b.contents();a.videoURL=b.attr("data-rsVideo")}var g,a={};this._f2=b=k(b);this.ev.trigger("rsBeforeParseNode",
[b,a]);if(!a.stopParsing){b=this._f2;a.id=this._n;a.contentAdded=false;this._n++;if(!a.hasCover){if(b.hasClass("rsImg")){tempEl=b;g=true}else{tempEl=b.find(".rsImg");tempEl.length&&(g=true)}if(g){a.bigImage=tempEl.attr("data-rsBigImg");tempEl.is("a")?c(tempEl,"href"):tempEl.is("img")&&c(tempEl)}else if(b.is("img")){b.addClass("rsImg");c(b)}}tempEl=b.find(".rsCaption");if(tempEl.length)a.caption=tempEl.remove();if(!a.image){a.isLoaded=true;a.isRendered=false;a.isLoading=false}a.content=b;this.ev.trigger("rsAfterParseNode",
[b,a]);e&&this.slides.push(a);return a}},_v1:function(){var b=this;b._a.on("keydown.rskb",function(e){if(!b._g2&&!b._h2)if(e.keyCode===37){e.preventDefault();b.prev()}else if(e.keyCode===39){e.preventDefault();b.next()}})},goTo:function(b,e){b!==this.currSlideId&&this._i2(b,this.st.transitionSpeed,true,!e)},destroy:function(b){var e=this;e.ev.trigger("rsBeforeDestroy");e._a.off("keydown.rskb "+e._g1+" "+e._h1);e._b1.on(e._f1,function(b){e._b2(b)});e.slider.data("royalSlider","");b&&e.slider.remove()},
_j2:function(b,e){function c(c,e,f){if(c.isAdded){g(e,c);a(e,c)}else{f||(f=d.slidesJQ[e]);if(c.holder)f=c.holder;else{f=d.slidesJQ[e]=k(f);c.holder=f}c.appendOnLoaded=false;a(e,c,f);g(e,c);d._l2(c,f,b);appended=c.isAdded=true}}function g(a,c){if(!c.contentAdded){d.setItemHtml(c,b);if(!b)c.contentAdded=true}}function a(a,b,c){if(d._j){c||(c=d.slidesJQ[a]);c.css(d._g,(a+d._z+q)*d._s)}}function f(a){if(j){if(a>m-1)return f(a-m);if(a<0)return f(m+a)}return a}var d=this,i,h,j=d._v,m=d.numSlides;if(!isNaN(e))return f(e);
var l=d.currSlideId,q,n=b?Math.abs(d._k2-d.currSlideId)>=d.numSlides-1?0:1:d._u,o=Math.min(2,n),r=false,s=false,p;for(h=l;h<l+1+o;h++){p=f(h);if((i=d.slides[p])&&(!i.isAdded||!i.positionSet)){r=true;break}}for(h=l-1;h>l-1-o;h--){p=f(h);if((i=d.slides[p])&&(!i.isAdded||!i.positionSet)){s=true;break}}if(r)for(h=l;h<l+n+1;h++){p=f(h);q=Math.floor((d._q-(l-h))/d.numSlides)*d.numSlides;(i=d.slides[p])&&c(i,p)}if(s)for(h=l-1;h>l-1-n;h--){p=f(h);q=Math.floor((d._q-(l-h))/m)*m;(i=d.slides[p])&&c(i,p)}if(!b){o=
f(l-n);l=f(l+n);n=o>l?0:o;for(h=0;h<m;h++)if(!(o>l&&h>o-1)&&(h<n||h>l))if((i=d.slides[h])&&i.holder){i.holder.detach();i.isAdded=false}}},setItemHtml:function(b,e){function c(){a.isWaiting=true;b.holder.html(g._c1.clone());a.slideId=-99}var g=this,a=b.holder,f=function(a){var b=a.sizeType;return function(d){var f=a.content,h=a.holder;if(d){var i=d.currentTarget;k(i).off("load error");if(d.type==="error"){a.isLoaded=true;a.image="";a.isLoading=false;f.addClass("rsSlideError");h.html(f);a.holder.trigger("rsAfterContentSet");
g.ev.trigger("rsAfterContentSet",a);return}}if(a.image){if(a.bigImage&&a.sizeType!==b){b==="med"?a.isMedLoading=false:b==="big"?a.isBigLoading=false:a.isMedLoading=a.isLoading=false;return}if(a.isLoaded){if(!a.isRendered&&e){c();return}g._m2(a)}else{var j;if(f.hasClass("rsImg")){j=true;d=f}else{j=false;d=f.find(".rsImg")}if(d.length&&d.is("a")){j?f=k('<img class="rsImg" src="'+a.image+'" />'):f.find(".rsImg").replaceWith('<img class="rsImg" src="'+a.image+'" />');a.content=f}a.iW=i.width;if(a.iW>
0){a.iH=i.height;a.isLoaded=true;a.isLoading=false;g._m2(a)}}}else{if(!g._t&&e&&!a.isRendered){a.isRendered=true;c();return}a.isLoaded=true;a.isLoading=false}i=a.id-g._l;if(!e&&!a.appendOnLoaded&&g.st.fadeinLoadedSlide&&(i===0||(g._h2||g._g2)&&(i===-1||i===1))){f.css(g._e+"transition","opacity 400ms ease-in-out").css({visibility:"visible",opacity:0});h.html(f);setTimeout(function(){f.css("opacity",1)},6)}else h.html(f);a.isRendered=true;h.find("a").off("click.rs").on("click.rs",function(){if(g.dragSuccess)return false;
g._c2=true;g.ev.trigger("rsSlideClick");setTimeout(function(){g._c2=false},3)});a.holder.trigger("rsAfterContentSet");g.ev.trigger("rsAfterContentSet",a);a.appendOnLoaded&&g._l2(a,f,e)}};if(b.isLoaded)f(b)();else if(e)c();else if(b.image)if(b.isLoading){var d=1,i=function(){if(b.isLoading)if(b.isLoaded)f(b)();else{if(d%50===0){var a=b.imageLoader;if(a.complete&&a.naturalWidth!==void 0&&a.naturalWidth!==0&&a.naturalHeight!==0){f(b)();return}}if(!(d>300)){setTimeout(i,400);d++}}};i(b.sizeType)}else{var h=
k("<img/>"),j=b.image;if(e)c();else if(!b.isLoading){if(!j){j=h.attr("src");h=k("<img/>")}b.holder.html(g._c1.clone());b.isLoading=true;b.imageLoader=h;h.one("load error",f(b)).attr("src",j)}}else f(b)()},_l2:function(b,e,c){var g=b.holder,a=b.id-this._l;if(this._j&&!c&&this.st.fadeinLoadedSlide&&(a===0||(this._h2||this._g2)&&(a===-1||a===1))){e=b.content;e.css(this._e+"transition","opacity 400ms ease-in-out").css({visibility:"visible",opacity:0});this._b1.append(g);setTimeout(function(){e.css("opacity",
1)},6)}else this._b1.append(g);b.appendOnLoaded=false},_b2:function(b,e){var c=this,g;c.dragSuccess=false;if(k(b.target).closest(".rsNoDrag",c._d1).length)return true;e||c._h2&&c._n2();if(c._g2){if(c.hasTouch)c._o2=true}else{if(c.hasTouch)c._o2=false;c._p2();if(c.hasTouch){var a=b.originalEvent.touches;if(a&&a.length>0){g=a[0];if(a.length>1)c._o2=true}else return}else{g=b;b.preventDefault()}c._g2=true;c._a.on(c._g1,function(a){c._q2(a,e)}).on(c._h1,function(a){c._r2(a,e)});c._s2="";c._t2=false;c._u2=
g.pageX;c._v2=g.pageY;c._w2=c._r=(!e?c._f:c._x2)?g.pageX:g.pageY;c._y2=0;c._z2=0;c._a3=!e?c._m:c._b3;c._c3=(new Date).getTime();if(c.hasTouch)c._a1.on(c._i1,function(a){c._r2(a,e)})}},_d3:function(b,e){if(this._e3){var c=this._f3,g=b.pageX-this._u2,a=b.pageY-this._v2,f=this._a3+g,d=this._a3+a,i=!e?this._f:this._x2,f=i?f:d,h=this._s2;this._t2=true;this._u2=b.pageX;this._v2=b.pageY;d=i?this._u2:this._v2;if(h==="x"&&g!==0)this._y2=g>0?1:-1;else if(h==="y"&&a!==0)this._z2=a>0?1:-1;g=i?g:a;if(e)f>this._g3?
f=this._a3+g*this._j1:f<this._h3&&(f=this._a3+g*this._j1);else if(!this._v){this.currSlideId<=0&&d-this._w2>0&&(f=this._a3+g*this._j1);this.currSlideId>=this.numSlides-1&&d-this._w2<0&&(f=this._a3+g*this._j1)}this._a3=f;if(c-this._c3>200){this._c3=c;this._r=d}e?this._j3(this._a3):this._j&&this._i3(this._a3)}},_q2:function(b,e){var c=this;if(c.hasTouch){if(c._k3)return;var g=b.originalEvent.touches;if(g){if(g.length>1)return;point=g[0]}else return}else point=b;if(!c._t2){c._c&&(!e?c._b1:c._l3).css(c._e+
c._o1,"0s");(function d(){if(c._g2){c._m3=requestAnimationFrame(d);c._n3&&c._d3(c._n3,e)}})()}if(c._e3){b.preventDefault();c._f3=(new Date).getTime();c._n3=point}else{var g=!e?c._f:c._x2,a=Math.abs(point.pageX-c._u2)-Math.abs(point.pageY-c._v2)-(g?-7:7);if(a>7){if(g){b.preventDefault();c._s2="x"}else if(c.hasTouch){c._o3();return}c._e3=true}else if(a<-7){if(g){if(c.hasTouch){c._o3();return}}else{b.preventDefault();c._s2="y"}c._e3=true}}},_o3:function(){this._k3=true;this._t2=this._g2=false;this._r2()},
_r2:function(b,e){function c(a){return a<100?100:a>500?500:a}function g(b,d){if(a._j||e){i=(-a._q-a._z)*a._s;h=Math.abs(a._m-i);a._b=h/d;if(b)a._b=a._b+250;a._b=c(a._b);a._q3(i,false)}}var a=this,f,d,i,h;a.ev.trigger("rsDragRelease");a._n3=null;a._g2=false;a._k3=false;a._e3=false;a._f3=0;cancelAnimationFrame(a._m3);a._t2&&(e?a._j3(a._a3):a._j&&a._i3(a._a3));a._a.off(a._g1).off(a._h1);a.hasTouch&&a._a1.off(a._i1);a._m1();if(!a._t2&&!a._o2&&e&&a._p3){var j=k(b.target).closest(".rsNavItem");j.length&&
a.goTo(j.index())}else{d=!e?a._f:a._x2;if(a._t2&&!(a._s2==="y"&&d||a._s2==="x"&&!d)){a.dragSuccess=true;a._s2="";var m=a.st.minSlideOffset;f=a.hasTouch?b.originalEvent.changedTouches[0]:b;var l=d?f.pageX:f.pageY,q=a._w2;f=a._r;var n=a.currSlideId,o=a.numSlides,r=d?a._y2:a._z2,s=a._v;Math.abs(l-q);f=l-f;d=(new Date).getTime()-a._c3;d=Math.abs(f)/d;if(r===0||o<=1)g(true,d);else{if(!s&&!e)if(n<=0){if(r>0){g(true,d);return}}else if(n>=o-1&&r<0){g(true,d);return}if(e){i=a._b3;if(i>a._g3)i=a._g3;else if(i<
a._h3)i=a._h3;else{m=d*d/0.006;j=-a._b3;l=a._r3-a._s3+a._b3;if(f>0&&m>j){j=j+a._s3/(15/(m/d*0.003));d=d*j/m;m=j}else if(f<0&&m>l){l=l+a._s3/(15/(m/d*0.003));d=d*l/m;m=l}j=Math.max(Math.round(d/0.003),50);i=i+m*(f<0?-1:1);if(i>a._g3){a._t3(i,j,true,a._g3,200);return}if(i<a._h3){a._t3(i,j,true,a._h3,200);return}}a._t3(i,j,true)}else q+m<l?r<0?g(false,d):a._i2("prev",c(Math.abs(a._m-(-a._q-a._z+1)*a._s)/d),false,true,true):q-m>l?r>0?g(false,d):a._i2("next",c(Math.abs(a._m-(-a._q-a._z-1)*a._s)/d),false,
true,true):g(false,d)}}}},_i3:function(b){b=this._m=b;this._c?this._b1.css(this._r1,this._s1+(this._f?b+this._t1+0:0+this._t1+b)+this._u1):this._b1.css(this._f?this._r1:this._q1,b)},updateSliderSize:function(b){var e,c;this.st.beforeResize&&this.st.beforeResize.call(this);if(this.st.autoScaleSlider){var g=this.st.autoScaleSliderWidth,a=this.st.autoScaleSliderHeight;if(this.st.autoScaleHeight){e=this.slider.width();if(e!=this.width){this.slider.css("height",e*(a/g));e=this.slider.width()}c=this.slider.height()}else{c=
this.slider.height();if(c!=this.height){this.slider.css("width",c*(g/a));c=this.slider.height()}e=this.slider.width()}}else{e=this.slider.width();c=this.slider.height()}this._e2=this.slider.offset();this._e2=this._e2[this._g];if(b||e!=this.width||c!=this.height){this.width=e;this.height=c;this._u3=e;this._v3=c;this.ev.trigger("rsBeforeSizeSet");this._a1.css({width:this._u3,height:this._v3});this._s=(this._f?this._u3:this._v3)+this.st.slidesSpacing;this._w3=this.st.imageScalePadding;for(e=0;e<this.slides.length;e++){b=
this.slides[e];b.positionSet=false;if(b&&b.image&&b.isLoaded){b.isRendered=false;this._m2(b)}}if(this._x3)for(e=0;e<this._x3.length;e++){b=this._x3[e];b.holder.css(this._g,(b.id+this._z)*this._s)}this._j2();if(this._j){this._c&&this._b1.css(this._e+"transition-duration","0s");this._i3((-this._q-this._z)*this._s)}this.ev.trigger("rsOnUpdateNav");this.st.afterResize&&this.st.afterResize.call(this)}},setSlidesOrientation:function(){},appendSlide:function(b,e){var c=this._o(b);if(isNaN(e)||e>this.numSlides)e=
this.numSlides;this.slides.splice(e,0,c);this.slidesJQ.splice(e,0,'<div style="'+(this._j?"position: absolute;":"z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;")+'" class="rsSlide"></div>');e<this.currSlideId&&this.currSlideId++;this.ev.trigger("rsOnAppendSlide",[c,e]);this._z3(e);e===this.currSlideId&&this.ev.trigger("rsAfterSlideChange")},removeSlide:function(b){var e=this.slides[b];if(e){e.holder&&e.holder.remove();b<this.currSlideId&&this.currSlideId++;this.slides.splice(b,
1);this.slidesJQ.splice(b,1);this.ev.trigger("rsOnRemoveSlide",[b]);this._z3(b);b===this.currSlideId&&this.ev.trigger("rsAfterSlideChange")}},_z3:function(){var b=this,e=b.numSlides,e=b._q<=0?0:Math.floor(b._q/e);b.numSlides=b.slides.length;if(b.numSlides===0){b.currSlideId=b._z=b._q=0;b.currSlide=b._a4=null}else b._q=e*b.numSlides+b.currSlideId;for(e=0;e<b.numSlides;e++)b.slides[e].id=e;b.currSlide=b.slides[b.currSlideId];b._d1=b.slidesJQ[b.currSlideId];b.currSlideId>=b.numSlides?b.goTo(b.numSlides-
1):b.currSlideId<0&&b.goTo(0);b._p();b._j&&b._v&&b._b1.css(b._e+b._o1,"0ms");b._b4&&clearTimeout(b._b4);b._b4=setTimeout(function(){b._i3((-b._q-b._z)*b._s);b._j2()},14);b.ev.trigger("rsOnUpdateNav")},_m1:function(){if(!this.hasTouch&&this._j)if(this._k1)this._a1.css("cursor",this._k1);else{this._a1.removeClass("grabbing-cursor");this._a1.addClass("grab-cursor")}},_p2:function(){if(!this.hasTouch&&this._j)if(this._l1)this._a1.css("cursor",this._l1);else{this._a1.removeClass("grab-cursor");this._a1.addClass("grabbing-cursor")}},
next:function(b){this._i2("next",this.st.transitionSpeed,true,!b)},prev:function(b){this._i2("prev",this.st.transitionSpeed,true,!b)},_i2:function(b,e,c,g,a){var f=this,d,i,h;f._d4&&f.stopVideo();f.ev.trigger("rsBeforeMove",[b,g]);newItemId=b==="next"?f.currSlideId+1:b==="prev"?f.currSlideId-1:b=parseInt(b,10);if(!f._v){if(newItemId<0){f._e4("left",!g);return}if(newItemId>=f.numSlides){f._e4("right",!g);return}}if(f._h2){f._n2();c=false}i=newItemId-f.currSlideId;h=f._k2=f.currSlideId;var j=f.currSlideId+
i,g=f._q,m;if(f._v){j=f._j2(false,j);g=g+i}else g=j;f._l=j;f._a4=f.slidesJQ[f.currSlideId];f._q=g;f.currSlideId=f._l;f.currSlide=f.slides[f.currSlideId];f._d1=f.slidesJQ[f.currSlideId];j=Boolean(i>0);i=Math.abs(i);var l=Math.floor(h/f._u),k=Math.floor((h+(j?2:-2))/f._u),l=(j?Math.max(l,k):Math.min(l,k))*f._u+(j?f._u-1:0);l>f.numSlides-1?l=f.numSlides-1:l<0&&(l=0);h=j?l-h:h-l;if(h>f._u)h=f._u;if(i>h+2){f._z=f._z+(i-(h+2))*(j?-1:1);e=e*1.4;for(h=0;h<f.numSlides;h++)f.slides[h].positionSet=false}f._b=
e;f._j2(true);a||(m=true);d=(-g-f._z)*f._s;if(m)setTimeout(function(){f._c4=false;f._q3(d,b,false,c);f.ev.trigger("rsOnUpdateNav")},0);else{f._q3(d,b,false,c);f.ev.trigger("rsOnUpdateNav")}},_z1:function(){if(this.st.arrowsNav)if(this.numSlides<=1){this._w1.css("display","none");this._x1.css("display","none")}else{this._w1.css("display","block");this._x1.css("display","block");if(!this._v&&!this.st.loopRewind){this.currSlideId===0?this._w1.addClass("rsArrowDisabled"):this._w1.removeClass("rsArrowDisabled");
this.currSlideId===this.numSlides-1?this._x1.addClass("rsArrowDisabled"):this._x1.removeClass("rsArrowDisabled")}}},_q3:function(b,e,c,g,a){function f(){var a=i.data("rsTimeout");if(a){i!==h&&i.css({opacity:0,display:"none",zIndex:0});clearTimeout(a);i.data("rsTimeout","")}if(a=h.data("rsTimeout")){clearTimeout(a);h.data("rsTimeout","")}}var d=this,i,h,j={};if(isNaN(d._b))d._b=400;d._m=d._a3=b;d.ev.trigger("rsBeforeAnimStart");d.st.beforeSlideChange&&d.st.beforeSlideChange.call(d);if(d._c)if(d._j){j[d._e+
d._o1]=d._b+"ms";j[d._e+d._p1]=g?k.rsCSS3Easing[d.st.easeInOut]:k.rsCSS3Easing[d.st.easeOut];d._b1.css(j);setTimeout(function(){d._i3(b)},d.hasTouch?5:0)}else{d._b=d.st.transitionSpeed;i=d._a4;h=d._d1;h.data("rsTimeout")&&h.css("opacity",0);f();i&&i.data("rsTimeout",setTimeout(function(){j[d._e+d._o1]="0ms";j.zIndex=0;j.display="none";i.data("rsTimeout","");i.css(j);setTimeout(function(){i.css("opacity",0)},16)},d._b+60));j.display="block";j.zIndex=d._k;j.opacity=0;j[d._e+d._o1]="0ms";j[d._e+d._p1]=
k.rsCSS3Easing[d.st.easeInOut];h.css(j);h.data("rsTimeout",setTimeout(function(){h.css(d._e+d._o1,d._b+"ms");h.data("rsTimeout",setTimeout(function(){h.css("opacity",1);h.data("rsTimeout","")},20))},20))}else if(d._j){j[d._f?d._r1:d._q1]=b+"px";d._b1.animate(j,d._b,g?d.st.easeInOut:d.st.easeOut)}else{i=d._a4;h=d._d1;h.stop(true,true).css({opacity:0,display:"block",zIndex:d._k});d._b=d.st.transitionSpeed;h.animate({opacity:1},d._b,d.st.easeInOut);f();i&&i.data("rsTimeout",setTimeout(function(){i.stop(true,
true).css({opacity:0,display:"none",zIndex:0})},d._b+60))}d._h2=true;d.loadingTimeout&&clearTimeout(d.loadingTimeout);d.loadingTimeout=a?setTimeout(function(){d.loadingTimeout=null;a.call()},d._b+60):setTimeout(function(){d.loadingTimeout=null;d._f4(e)},d._b+60)},_n2:function(){this._h2=false;clearTimeout(this.loadingTimeout);if(this._j)if(this._c){var b=this._m,e=this._a3=this._g4();this._b1.css(this._e+this._o1,"0ms");b!==e&&this._i3(e)}else{this._b1.stop(true);this._m=parseInt(this._b1.css(this._r1),
10)}else this._k>20?this._k=10:this._k++},_g4:function(){var b=window.getComputedStyle(this._b1.get(0),null).getPropertyValue(this._e+"transform").replace(/^matrix\(/i,"").split(/, |\)$/g);return parseInt(b[this._f?4:5],10)},_h4:function(b,e){return this._c?this._s1+(e?b+this._t1+0:0+this._t1+b)+this._u1:b},_f4:function(){if(!this._j){this._d1.css("z-index",0);this._k=10}this._h2=false;this.staticSlideId=this.currSlideId;this._j2();this._i4=false;this.ev.trigger("rsAfterSlideChange");this.st.afterSlideChange&&
this.st.afterSlideChange.call(this)},_e4:function(b,e){var c=this,g=(-c._q-c._z)*c._s;moveDist=30;if(c.numSlides!==0)if(c.st.loopRewind)b==="left"?c.goTo(c.numSlides-1,e):c.goTo(0,e);else if(!c._h2&&c._j&&moveDist!==0){c._b=200;var a=function(){c._h2=false};c._q3(g+(b==="left"?moveDist:-moveDist),"",false,true,function(){c._h2=false;c._q3(g,"",false,true,a)})}},_m2:function(b){if(!b.isRendered){var e=b.content,c="rsImg",g,a=this.st.imageAlignCenter,f=this.st.imageScaleMode,d;if(b.videoURL){c="rsVideoContainer";
if(f!=="fill")g=true;else{d=e;d.hasClass(c)||(d=d.find("."+c));d.css({width:"100%",height:"100%"});c="rsImg"}}e.hasClass(c)||(e=e.find("."+c));var i=b.iW,c=b.iH;b.isRendered=true;if(f!=="none"||a){bMargin=f!=="fill"?this._w3:0;b=this._u3-bMargin*2;d=this._v3-bMargin*2;var h,j,k={};if(f==="fit-if-smaller"&&(i>b||c>d))f="fit";if(f==="fill"||f==="fit"){h=b/i;j=d/c;h=f=="fill"?h>j?h:j:f=="fit"?h<j?h:j:1;i=Math.ceil(i*h,10);c=Math.ceil(c*h,10)}if(f!=="none"){k.width=i;k.height=c;g&&e.find(".rsImg").css({width:"100%",
height:"100%"})}if(a){k.marginLeft=Math.floor((b-i)/2)+bMargin;k.marginTop=Math.floor((d-c)/2)+bMargin}e.css(k)}}}};k.rsProto=t.prototype;k.fn.royalSlider=function(b){var e=arguments;return this.each(function(){var c=k(this);if(typeof b==="object"||!b)c.data("royalSlider")||c.data("royalSlider",new t(c,b));else if((c=c.data("royalSlider"))&&c[b])return c[b].apply(c,Array.prototype.slice.call(e,1))})};k.fn.royalSlider.defaults={slidesSpacing:8,startSlideId:0,loop:!1,loopRewind:!1,numImagesToPreload:4,
fadeinLoadedSlide:!0,slidesOrientation:"horizontal",transitionType:"move",transitionSpeed:600,controlNavigation:"bullets",controlsInside:!0,arrowsNav:!0,arrowsNavAutoHide:!0,navigateByClick:!0,randomizeSlides:!1,sliderDrag:!0,sliderTouch:!0,keyboardNavEnabled:!1,fadeInAfterLoaded:!0,allowCSS3:!0,allowCSS3OnWebkit:!0,addActiveClass:!1,autoHeight:!1,easeOut:"easeOutSine",easeInOut:"easeInOutSine",minSlideOffset:10,imageScaleMode:"fit-if-smaller",imageAlignCenter:!0,imageScalePadding:4,autoScaleSlider:!1,
autoScaleSliderWidth:800,autoScaleSliderHeight:400,autoScaleHeight:!0,arrowsNavHideOnTouch:!1,globalCaption:!1,beforeSlideChange:null,afterSlideChange:null,beforeResize:null,afterResize:null};k.rsCSS3Easing={easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)"};k.extend(jQuery.easing,{easeInOutSine:function(b,e,c,g,a){return-g/2*(Math.cos(Math.PI*e/a)-1)+c},easeOutSine:function(b,e,c,g,a){return g*Math.sin(e/a*(Math.PI/2))+c},easeOutCubic:function(b,
e,c,g,a){return g*((e=e/a-1)*e*e+1)+c}})})(jQuery);
// jquery.rs.active-class v1.0
(function(b){b.rsProto._j4=function(){var c,a=this;if(a.st.addActiveClass){a.ev.on("rsBeforeMove",function(){b()});a.ev.on("rsAfterInit",function(){b()});var b=function(){c&&clearTimeout(c);c=setTimeout(function(){a._a4&&a._a4.removeClass("rsActiveSlide");a._d1&&a._d1.addClass("rsActiveSlide");c=null},50)}}};b.rsModules.activeClass=b.rsProto._j4})(jQuery);
// jquery.rs.animated-blocks v1.0.2
(function(i){i.extend(i.rsProto,{_k4:function(){function j(){var e=a.currSlide;if(a.currSlide&&a.currSlide.isLoaded&&a._o4!==e){if(0<a._n4.length){for(b=0;b<a._n4.length;b++)clearTimeout(a._n4[b]);a._n4=[]}if(0<a._m4.length){var g;for(b=0;b<a._m4.length;b++)if(g=a._m4[b])a._c?(g.block.css(a._e+a._o1,"0s"),g.block.css(g.css)):g.running?g.block.stop(!0,!0):g.block.css(g.css),a._o4=null,e.animBlocksDisplayed=!1;a._m4=[]}e.animBlocks&&(e.animBlocksDisplayed=!0,a._o4=e,a._p4(e.animBlocks))}}var a=this,
b;a._l4={fadeEffect:!0,moveEffect:"top",moveOffset:20,speed:400,easing:"easeOutSine",delay:200};a.st.block=i.extend({},a._l4,a.st.block);a._m4=[];a._n4=[];a.ev.on("rsAfterInit",function(){j()});a.ev.on("rsBeforeParseNode",function(a,b,c){b=i(b);c.animBlocks=b.find(".rsABlock").css("display","none");c.animBlocks.length||(c.animBlocks=b.hasClass("rsABlock")?b.css("display","none"):!1)});a.ev.on("rsAfterContentSet",function(b,g){g.id===a.currSlideId&&setTimeout(function(){j()},a.st.fadeinLoadedSlide?
300:0)});a.ev.on("rsAfterSlideChange",function(){j()})},_q4:function(i,a){setTimeout(function(){i.css(a)},6)},_p4:function(j){var a=this,b,e,g,c;a._n4=[];j.each(function(j){b=i(this);e={};g={};c=null;var f=b.data("move-offset");isNaN(f)&&(f=a.st.block.moveOffset);if(0<f){var d=b.data("move-effect");d?(d=d.toLowerCase(),"none"===d?d=!1:"left"!==d&&("top"!==d&&"bottom"!==d&&"right"!==d)&&(d=a.st.block.moveEffect,"none"===d&&(d=!1))):d=a.st.block.moveEffect;if(d){var l;l="right"===d||"left"===d?!0:!1;
var k,h;isOppositeProp=!1;a._c?(k=0,h=a._r1):(l?isNaN(parseInt(b.css("right"),10))?h="left":(h="right",isOppositeProp=!0):isNaN(parseInt(b.css("bottom"),10))?h="top":(h="bottom",isOppositeProp=!0),h="margin-"+h,isOppositeProp&&(f=-f),k=parseInt(b.css(h),10));g[h]=a._h4("top"===d||"left"===d?k-f:k+f,l);e[h]=a._h4(k,l)}}if(f=b.attr("data-fade-effect")){if("none"===f.toLowerCase()||"false"===f.toLowerCase())f=!1}else f=a.st.block.fadeEffect;f&&(g.opacity=0,e.opacity=1);if(f||d)if(c={},c.hasFade=Boolean(f),
Boolean(d)&&(c.moveProp=h,c.hasMove=!0),c.speed=b.data("speed"),isNaN(c.speed)&&(c.speed=a.st.block.speed),c.easing=b.data("easing"),c.easing||(c.easing=a.st.block.easing),c.css3Easing=i.rsCSS3Easing[c.easing],c.delay=b.data("delay"),isNaN(c.delay))c.delay=a.st.block.delay*j;d={};a._c&&(d[a._e+a._o1]="0ms");d.moveProp=e.moveProp;d.opacity=e.opacity;d.display="none";a._m4.push({block:b,css:d});a._q4(b,g);a._n4.push(setTimeout(function(b,d,c,g){return function(){b.css("display","block");if(c){var f=
{};if(a._c){var e="";c.hasMove&&(e=e+c.moveProp);if(c.hasFade){c.hasMove&&(e=e+", ");e=e+"opacity"}f[a._e+a._n1]=e;f[a._e+a._o1]=c.speed+"ms";f[a._e+a._p1]=c.css3Easing;b.css(f);setTimeout(function(){b.css(d)},24)}else setTimeout(function(){b.animate(d,c.speed,c.easing)},16)}delete a._n4[g]}}(b,e,c,j),6>=c.delay?12:c.delay))})}});i.rsModules.animatedBlocks=i.rsProto._k4})(jQuery);
// jquery.rs.auto-height v1.0.1
(function(b){b.extend(b.rsProto,{_r4:function(){var a=this;if(a.st.autoHeight){var b,c;a.slider.addClass("rsAutoHeight");a.ev.on("rsAfterInit",function(){setTimeout(function(){d(!1);setTimeout(function(){a.slider.append('<div id="clear" style="clear:both;"></div>');a._c&&a._a1.css(a._e+"transition","height "+a.st.transitionSpeed+"ms ease-in-out")},16)},16)});a.ev.on("rsBeforeAnimStart",function(){d(!0)});a.ev.on("rsBeforeSizeSet",function(){setTimeout(function(){d(!1)},16)});var d=function(f){var e=
a.slides[a.currSlideId];b=e.holder;if(e.isLoaded)b&&(c=b.height(),0!==c&&void 0!==c&&(a._v3=c,a._c||!f?a._a1.css("height",c):a._a1.stop(!0,!0).animate({height:c},a.st.transitionSpeed)));else a.ev.off("rsAfterContentSet.rsAutoHeight").on("rsAfterContentSet.rsAutoHeight",function(a,b){e===b&&d()})}}}});b.rsModules.autoHeight=b.rsProto._r4})(jQuery);
// jquery.rs.autoplay v1.0.2
(function(b){b.extend(b.rsProto,{_u4:function(){var a=this,d;a._v4={enabled:!1,stopAtAction:!0,pauseOnHover:!0,delay:2E3};a.st.autoPlay=b.extend({},a._v4,a.st.autoPlay);a.st.autoPlay.enabled&&(a.ev.on("rsBeforeParseNode",function(a,c,e){c=b(c);if(d=c.attr("data-rsDelay"))e.customDelay=parseInt(d,10)}),a.ev.one("rsAfterInit",function(){a._w4()}),a.ev.on("rsBeforeDestroy",function(){a.stopAutoPlay()}))},_w4:function(){var a=this;a.startAutoPlay();a.ev.on("rsAfterContentSet",function(d,b){!a._g2&&(!a._h2&&
a._x4&&b===a.currSlide)&&a._y4()});a.ev.on("rsDragRelease",function(){a._x4&&a._z4&&(a._z4=!1,a._y4())});a.ev.on("rsAfterSlideChange",function(){a._x4&&a._z4&&(a._z4=!1,a.currSlide.isLoaded&&a._y4())});a.ev.on("rsDragStart",function(){a._x4&&(a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._z4=!0,a._a5()))});a.ev.on("rsBeforeMove",function(b,f,c){a._x4&&(c&&a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._z4=!0,a._a5()))});a._b5=!1;a.ev.on("rsVideoStop",function(){a._x4&&(a._b5=!1,a._y4())});a.ev.on("rsVideoPlay",
function(){a._x4&&(a._z4=!1,a._a5(),a._b5=!0)});a.st.autoPlay.pauseOnHover&&(a._c5=!1,a.slider.hover(function(){a._x4&&(a._z4=!1,a._a5(),a._c5=!0)},function(){a._x4&&(a._c5=!1,a._y4())}))},toggleAutoplay:function(){this._x4?this.startAutoPlay():this.stopAutoPlay()},startAutoPlay:function(){this._x4=!0;this.currSlide.isLoaded&&this._y4()},stopAutoPlay:function(){this._b5=this._c5=this._z4=this._x4=!1;this._a5()},_y4:function(){var a=this;!a._c5&&!a._b5&&(a._d5=!0,a._e5&&clearTimeout(a._e5),a._e5=setTimeout(function(){var b;
!a._v&&!a.st.loopRewind&&(b=!0,a.st.loopRewind=!0);a.next(!0);b&&(a.st.loopRewind=!1)},!a.currSlide.customDelay?a.st.autoPlay.delay:a.currSlide.customDelay))},_a5:function(){!this._c5&&!this._b5&&(this._d5=!1,this._e5&&(clearTimeout(this._e5),this._e5=null))}});b.rsModules.autoplay=b.rsProto._u4})(jQuery);
// jquery.rs.bullets v1.0
(function(c){c.extend(c.rsProto,{_f5:function(){var a=this;"bullets"===a.st.controlNavigation&&(a.ev.one("rsAfterPropsSetup",function(){a._g5=!0;a.slider.addClass("rsWithBullets");for(var b='<div class="rsNav rsBullets">',e=0;e<a.numSlides;e++)b+='<div class="rsNavItem rsBullet"><span class=""></span></div>';b=c(b+"</div>");a._t4=b;a._h5=b.children();a.slider.append(b);a._t4.click(function(b){b=c(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())})}),a.ev.on("rsOnAppendSlide",function(b,
c,d){d>=a.numSlides?a._t4.append('<div class="rsNavItem rsBullet"><span class=""></span></div>'):a._h5.eq(d).before('<div class="rsNavItem rsBullet"><span class=""></span></div>');a._h5=a._t4.children()}),a.ev.on("rsOnRemoveSlide",function(b,c){var d=a._h5.eq(c);d&&(d.remove(),a._h5=a._t4.children())}),a.ev.on("rsOnUpdateNav",function(){var b=a.currSlideId;a._i5&&a._i5.removeClass("rsNavSelected");b=c(a._h5[b]);b.addClass("rsNavSelected");a._i5=b}))}});c.rsModules.bullets=c.rsProto._f5})(jQuery);
// jquery.rs.deeplinking v1.0.1 + jQuery hashchange plugin v1.3 Copyright (c) 2010
(function(a){a.extend(a.rsProto,{_j5:function(){var b=this,g,d,e;b._k5={enabled:!1,change:!1,prefix:""};b.st.deeplinking=a.extend({},b._k5,b.st.deeplinking);if(b.st.deeplinking.enabled){var j=b.st.deeplinking.change,c="#"+b.st.deeplinking.prefix,f=function(){var a=window.location.hash;return a&&(a=parseInt(a.substring(c.length),10),0<=a)?a-1:-1},h=f();-1!==h&&(b.st.startSlideId=h);if(j)a(window).on("hashchange.rs",function(){if(!g){var a=f();a<0?a=0:a>b.numSlides-1&&(a=b.numSlides-1);b.goTo(a)}});
b.ev.on("rsAfterSlideChange",function(){d&&clearTimeout(d);e&&clearTimeout(e);e=setTimeout(function(){g=true;window.location.hash=c+(b.currSlideId+1);d=setTimeout(function(){g=false;d=0},60)},750)})}}});a.rsModules.deeplinking=a.rsProto._j5})(jQuery);
(function(a,b,g){function d(a){a=a||location.href;return"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}"$:nomunge";var e=document,j,c=a.event.special,f=e.documentMode,h="onhashchange"in b&&(f===g||7<f);a.fn.hashchange=function(a){return a?this.bind("hashchange",a):this.trigger("hashchange")};a.fn.hashchange.delay=50;c.hashchange=a.extend(c.hashchange,{setup:function(){if(h)return!1;a(j.start)},teardown:function(){if(h)return!1;a(j.stop)}});var n=function(){var c=d(),e=p(m);c!==m?(o(m=c,e),a(b).trigger("hashchange")):
e!==m&&(location.href=location.href.replace(/#.*/,"")+e);k=setTimeout(n,a.fn.hashchange.delay)},c={},k,m=d(),o=f=function(a){return a},p=f;c.start=function(){k||n()};c.stop=function(){k&&clearTimeout(k);k=g};if(a.browser.msie&&!h){var i,l;c.start=function(){i||(l=(l=a.fn.hashchange.src)&&l+d(),i=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){l||o(d());n()}).attr("src",l||"javascript:0").insertAfter("body")[0].contentWindow,e.onpropertychange=function(){try{"title"===event.propertyName&&
(i.document.title=e.title)}catch(a){}})};c.stop=f;p=function(){return d(i.location.href)};o=function(b,c){var d=i.document,f=a.fn.hashchange.domain;b!==c&&(d.title=e.title,d.open(),f&&d.write('<script>document.domain="'+f+'"<\/script>'),d.close(),i.location.hash=b)}}j=c})(jQuery,this);
// jquery.rs.fullscreen v1.0
(function(c){c.extend(c.rsProto,{_l5:function(){var a=this;a._m5={enabled:!1,keyboardNav:!0,buttonFS:!0,nativeFS:!1,doubleTap:!0};a.st.fullscreen=c.extend({},a._m5,a.st.fullscreen);if(a.st.fullscreen.enabled)a.ev.one("rsBeforeSizeSet",function(){a._n5()})},_n5:function(){var a=this;a._o5=!a.st.keyboardNavEnabled&&a.st.fullscreen.keyboardNav;if(a.st.fullscreen.nativeFS){a._p5={supportsFullScreen:!1,isFullScreen:function(){return!1},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",
prefix:""};var b=["webkit","moz","o","ms","khtml"];if("undefined"!=typeof document.cancelFullScreen)a._p5.supportsFullScreen=!0;else for(var d=0;d<b.length;d++)if(a._p5.prefix=b[d],"undefined"!=typeof document[a._p5.prefix+"CancelFullScreen"]){a._p5.supportsFullScreen=!0;break}a._p5.supportsFullScreen?(a._p5.fullScreenEventName=a._p5.prefix+"fullscreenchange.rs",a._p5.isFullScreen=function(){switch(this.prefix){case "":return document.fullScreen;case "webkit":return document.webkitIsFullScreen;default:return document[this.prefix+
"FullScreen"]}},a._p5.requestFullScreen=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},a._p5.cancelFullScreen=function(){return""===this.prefix?document.cancelFullScreen():document[this.prefix+"CancelFullScreen"]()}):a._p5=!1}a.st.fullscreen.buttonFS&&(a._q5=c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a.st.controlsInside?a._a1:a.slider).on("click.rs",function(){a.isFullscreen?a.exitFullscreen():a.enterFullscreen()}))},
enterFullscreen:function(a){var b=this;if(b._p5)if(a)b._p5.requestFullScreen(c("html")[0]);else{b._a.on(b._p5.fullScreenEventName,function(){b._p5.isFullScreen()?b.enterFullscreen(!0):b.exitFullscreen(!0)});b._p5.requestFullScreen(c("html")[0]);return}if(!b._r5){b._r5=!0;b._a.on("keyup.rsfullscreen",function(a){27===a.keyCode&&b.exitFullscreen()});b._o5&&b._v1();b._s5=c("html").attr("style");b._t5=c("body").attr("style");b._u5=b.slider.attr("style");c("body, html").css({overflow:"hidden",height:"100%",
width:"100%",margin:"0",padding:"0"});b.slider.addClass("rsFullscreen");var d;for(d=0;d<b.numSlides;d++)if(a=b.slides[d],a.isRendered=!1,a.bigImage){a.isMedLoaded=a.isLoaded;a.isMedLoading=a.isLoading;a.medImage=a.image;a.medIW=a.iW;a.medIH=a.iH;a.slideId=-99;a.bigImage!==a.medImage&&(a.sizeType="big");a.isLoaded=a.isBigLoaded;a.isLoading=a.isBigLoading;a.image=a.bigImage;a.iW=a.bigIW;a.iH=a.bigIH;a.contentAdded=!1;var e=!a.isLoaded?'<a class="rsImg" href="'+a.image+'"></a>':'<img class="rsImg" src="'+
a.image+'"/>';a.content.hasClass("rsImg")?a.content=c(e):a.content.find(".rsImg").replaceWith(e)}b.isFullscreen=!0;setTimeout(function(){b._r5=!1;b.updateSliderSize()},100)}},exitFullscreen:function(a){var b=this;if(b._p5){if(!a){b._p5.cancelFullScreen(c("html")[0]);return}b._a.off(b._p5.fullScreenEventName)}if(!b._r5){b._r5=!0;b._a.off("keyup.rsfullscreen");b._o5&&b._a.off("keydown.rskb");c("html").attr("style",b._s5||"");c("body").attr("style",b._t5||"");b.slider.removeClass("rsFullscreen");var d;
for(d=0;d<b.numSlides;d++)if(a=b.slides[d],a.isRendered=!1,a.bigImage){a.slideId=-99;a.isBigLoaded=a.isLoaded;a.isBigLoading=a.isLoading;a.bigImage=a.image;a.bigIW=a.iW;a.bigIH=a.iH;a.isLoaded=a.isMedLoaded;a.isLoading=a.isMedLoading;a.image=a.medImage;a.iW=a.medIW;a.iH=a.medIH;a.contentAdded=!1;var e=!a.isLoaded?'<a class="rsImg" href="'+a.image+'"></a>':'<img class="rsImg" src="'+a.image+'"/>';a.content.hasClass("rsImg")?a.content=c(e):a.content.find(".rsImg").replaceWith(e);a.holder&&a.holder.html(a.content);
a.bigImage!==a.medImage&&(a.sizeType="med")}b.isFullscreen=!1;setTimeout(function(){b._r5=!1;b.updateSliderSize()},100)}}});c.rsModules.fullscreen=c.rsProto._l5})(jQuery);
// jquery.rs.global-caption v1.0
(function(b){b.extend(b.rsProto,{_v5:function(){var a=this;a.st.globalCaption&&(a.ev.on("rsAfterInit",function(){a.globalCaption=b('<div class="rsGCaption"></div>').appendTo(a.slider);a.globalCaption.html(a.currSlide.caption)}),a.ev.on("rsBeforeAnimStart",function(){a.globalCaption.html(a.currSlide.caption)}))}});b.rsModules.globalCaption=b.rsProto._v5})(jQuery);
// jquery.rs.nav-auto-hide v1.0
(function(b){b.extend(b.rsProto,{_s4:function(){var a=this;if(a.st.navAutoHide&&!a.hasTouch)a.ev.one("rsAfterInit",function(){if(a._t4){a._t4.addClass("rsHidden");var b=a.slider;b.one("mousemove.controlnav",function(){a._t4.removeClass("rsHidden")});b.hover(function(){a._t4.removeClass("rsHidden")},function(){a._t4.addClass("rsHidden")})}})}});b.rsModules.autoHideNav=b.rsProto._s4})(jQuery);
// jquery.rs.tabs v1.0.1
(function(e){e.extend(e.rsProto,{_w5:function(){var a=this;"tabs"===a.st.controlNavigation&&(a.ev.on("rsBeforeParseNode",function(a,d,b){d=e(d);b.thumbnail=d.find(".rsTmb").remove();b.thumbnail.length?b.thumbnail=e(document.createElement("div")).append(b.thumbnail).html():(b.thumbnail=d.attr("data-rsTmb"),b.thumbnail||(b.thumbnail=d.find(".rsImg").attr("data-rsTmb")),b.thumbnail=b.thumbnail?'<img src="'+b.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._x5()}),a.ev.on("rsOnAppendSlide",
function(c,d,b){b>=a.numSlides?a._t4.append('<div class="rsNavItem rsTab">'+d.thumbnail+"</div>"):a._h5.eq(b).before('<div class="rsNavItem rsTab">'+item.thumbnail+"</div>");a._h5=a._t4.children()}),a.ev.on("rsOnRemoveSlide",function(c,d){var b=a._h5.eq(d);b&&(b.remove(),a._h5=a._t4.children())}),a.ev.on("rsOnUpdateNav",function(){var c=a.currSlideId;a._i5&&a._i5.removeClass("rsNavSelected");c=e(a._h5[c]);c.addClass("rsNavSelected");a._i5=c}))},_x5:function(){var a=this,c,d;a._g5=!0;c='<div class="rsNav rsTabs">';
for(var b=0;b<a.numSlides;b++)b===a.numSlides-1&&(style=""),d=a.slides[b],c+='<div class="rsNavItem rsTab">'+d.thumbnail+"</div>";c=e(c+"</div>");a._t4=c;a._h5=c.find(".rsNavItem");a.slider.append(c);a._t4.click(function(b){b=e(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())})}});e.rsModules.tabs=e.rsProto._w5})(jQuery);
// jquery.rs.thumbnails v1.0.2
(function(f){f.extend(f.rsProto,{_y5:function(){var a=this;"thumbnails"===a.st.controlNavigation&&(a._z5={drag:!0,touch:!0,orientation:"horizontal",navigation:!0,arrows:!0,arrowLeft:null,arrowRight:null,spacing:4,arrowsAutoHide:!1,appendSpan:!1,transitionSpeed:600,autoCenter:!0,fitInViewport:!0,firstMargin:!0},a.st.thumbs=f.extend({},a._z5,a.st.thumbs),a.ev.on("rsBeforeParseNode",function(a,b,c){b=f(b);c.thumbnail=b.find(".rsTmb").remove();c.thumbnail.length?c.thumbnail=f(document.createElement("div")).append(c.thumbnail).html():
(c.thumbnail=b.attr("data-rsTmb"),c.thumbnail||(c.thumbnail=b.find(".rsImg").attr("data-rsTmb")),c.thumbnail=c.thumbnail?'<img src="'+c.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._a6()}),a.ev.on("rsOnUpdateNav",function(){var e=a.currSlideId,b;a._i5&&a._i5.removeClass("rsNavSelected");b=f(a._h5[e]);b.addClass("rsNavSelected");a._b6&&a._c6(e);a._i5=b}),a.ev.on("rsOnAppendSlide",function(e,b,c){e="<div"+a._d6+' class="rsNavItem rsThumb">'+a._e6+b.thumbnail+"</div>";c>=a.numSlides?
a._l3.append(e):a._h5.eq(c).before(e);a._h5=a._l3.children();a.updateThumbsSize()}),a.ev.on("rsOnRemoveSlide",function(e,b){var c=a._h5.eq(b);c&&(c.remove(),a._h5=a._l3.children(),a.updateThumbsSize())}))},_a6:function(){var a=this,e="rsThumbs",b="",c,g,d=a.st.thumbs.spacing;a._g5=!0;0<d?(c=d+"px ",c=' style="margin: 0 '+c+c+'0;"'):c="";a._d6=c;a._x2="vertical"===a.st.thumbs.orientation?!1:!0;a._b3=0;a._f6=!1;a._g6=!1;a._b6=!1;a._h6=a.st.thumbs.arrows&&a.st.thumbs.navigation;g=a._x2?"Hor":"Ver";a.slider.addClass("rsWithThumbs rsWithThumbs"+
g);b+='<div class="rsNav rsThumbs rsThumbs'+g+'"><div class="'+e+'Container">';a._e6=a.st.thumbs.appendSpan?'<span class="thumbIco"></span>':"";for(var h=0;h<a.numSlides;h++)g=a.slides[h],b+="<div"+c+' class="rsNavItem rsThumb">'+a._e6+g.thumbnail+"</div>";b=f(b+"</div></div>");a._l3=f(b).find("."+e+"Container");if(a._h6&&(e+="Arrow",a.st.thumbs.arrowLeft?a._i6=a.st.thumbs.arrowLeft:(a._i6=f('<div class="'+e+" "+e+'Left"><div class="'+e+'Icn"></div></div>'),b.append(a._i6)),a.st.thumbs.arrowRight?
a._j6=a.st.thumbs.arrowRight:(a._j6=f('<div class="'+e+" "+e+'Right"><div class="'+e+'Icn"></div></div>'),b.append(a._j6)),a._i6.click(function(){var b=(Math.floor(a._b3/a._k6)+a._l6)*a._k6;a._t3(b>a._g3?a._g3:b)}),a._j6.click(function(){var b=(Math.floor(a._b3/a._k6)-a._l6)*a._k6;a._t3(b<a._h3?a._h3:b)}),a.st.thumbs.arrowsAutoHide&&!a.hasTouch))a._i6.css("opacity",0),a._j6.css("opacity",0),b.one("mousemove.rsarrowshover",function(){if(a._b6){a._i6.css("opacity",1);a._j6.css("opacity",1)}}),b.hover(function(){if(a._b6){a._i6.css("opacity",
1);a._j6.css("opacity",1)}},function(){if(a._b6){a._i6.css("opacity",0);a._j6.css("opacity",0)}});a._t4=b;a._h5=a._l3.children();a.slider.append(b);a._p3=!0;a._m6=d;a.st.thumbs.navigation&&a._c&&a._l3.css(a._e+"transition-property",a._e+"transform");a._t4.click(function(b){if(!a._g6){b=f(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())}});a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs",function(){a._n6=a._x2?a._v3:a._u3;a.updateThumbsSize()})},updateThumbsSize:function(){var a=
this,e=a._h5.first(),b={},c=a._h5.length;a._k6=(a._x2?e.outerWidth():e.outerHeight())+a._m6;a._r3=c*a._k6-a._m6;b[a._x2?"width":"height"]=a._r3+a._m6;a._s3=a._x2?a._t4.width():a._t4.height();a._h3=-(a._r3-a._s3)-(a.st.thumbs.firstMargin?a._m6:0);a._g3=a.st.thumbs.firstMargin?a._m6:0;a._l6=Math.floor(a._s3/a._k6);if(a._r3<a._s3)a.st.thumbs.autoCenter&&a._j3((a._s3-a._r3)/2),a.st.thumbs.arrows&&a._i6&&(a._i6.addClass("rsThumbsArrowDisabled"),a._j6.addClass("rsThumbsArrowDisabled")),a._b6=!1,a._g6=!1,
a._t4.off(a._f1);else if(a.st.thumbs.navigation&&!a._b6&&(a._b6=!0,!a.hasTouch&&a.st.thumbs.drag||a.hasTouch&&a.st.thumbs.touch))a._g6=!0,a._t4.on(a._f1,function(b){a._b2(b,!0)});a._l3.css(b);if(a._p3&&(a.isFullscreen||a.st.thumbs.fitInViewport))a._x2?a._v3=a._n6-a._t4.outerHeight():a._u3=a._n6-a._t4.outerWidth()},setThumbsOrientation:function(a,e){this._p3&&(this.st.thumbs.orientation=a,this._t4.remove(),this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"),this._a6(),this._t4.off(this._f1),
e||this.updateSliderSize(!0))},_j3:function(a){this._b3=a;this._c?this._l3.css(this._r1,this._s1+(this._x2?a+this._t1+0:0+this._t1+a)+this._u1):this._l3.css(this._x2?this._r1:this._q1,a)},_t3:function(a,e,b,c,g){var d=this;if(d._b6){e||(e=d.st.thumbs.transitionSpeed);d._b3=a;d._o6&&clearTimeout(d._o6);d._f6&&(d._c||d._l3.stop(),b=!0);var h={};d._f6=!0;d._c?(h[d._e+"transition-duration"]=e+"ms",h[d._e+"transition-timing-function"]=b?f.rsCSS3Easing[d.st.easeOut]:f.rsCSS3Easing[d.st.easeInOut],d._l3.css(h),
d._j3(a)):(h[d._x2?d._r1:d._q1]=a+"px",d._l3.animate(h,e,b?"easeOutCubic":d.st.easeInOut));c&&(d._b3=c);d._p6();d._o6=setTimeout(function(){d._f6=false;if(g){d._t3(c,g,true);g=null}},e)}},_p6:function(){this._h6&&(this._b3===this._g3?this._i6.addClass("rsThumbsArrowDisabled"):this._i6.removeClass("rsThumbsArrowDisabled"),this._b3===this._h3?this._j6.addClass("rsThumbsArrowDisabled"):this._j6.removeClass("rsThumbsArrowDisabled"))},_c6:function(a,e){var b=0,c,f=a*this._k6+2*this._k6-this._m6+this._g3,
d=Math.floor(this._b3/this._k6);this._b6&&(f+this._b3>this._s3?(a===this.numSlides-1&&(b=1),d=-a+this._l6-2+b,c=d*this._k6+this._s3%this._k6+this._m6-this._g3):0!==a?(a-1)*this._k6<=-this._b3+this._g3&&a-1<=this.numSlides-this._l6&&(c=(-a+1)*this._k6+this._g3):c=this._g3,c!==this._b3&&(b=void 0===c?this._b3:c,b>this._g3?this._j3(this._g3):b<this._h3?this._j3(this._h3):void 0!==c&&(e?this._j3(c):this._t3(c))),this._p6())}});f.rsModules.thumbnails=f.rsProto._y5})(jQuery);
// jquery.rs.video v1.0.3
(function(e){e.extend(e.rsProto,{_q6:function(){var a=this;a._r6={autoHideArrows:!0,autoHideControlNav:!1,autoHideBlocks:!1,youTubeCode:'<iframe src="http://www.youtube.com/embed/%id%?rel=1&autoplay=1&showinfo=0&autoplay=1" frameborder="no"></iframe>',vimeoCode:'<iframe src="http://player.vimeo.com/video/%id%?byline=0&amp;portrait=0&amp;autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'};a.st.video=e.extend({},a._r6,a.st.video);a.ev.on("rsBeforeSizeSet",
function(){a._d4&&setTimeout(function(){var b=a._d1,b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer");a._s6.css({width:b.width(),height:b.height()})},32)});var d=e.browser.mozilla;a.ev.on("rsAfterParseNode",function(b,f,c){b=e(f);if(c.videoURL){d&&(a._c=a._d=!1);var f=e('<div class="rsVideoContainer"></div>'),g=e('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');b.hasClass("rsImg")?c.content=f.append(b).append(g):c.content.find(".rsImg").wrap(f).after(g)}})},
toggleVideo:function(){return this._d4?this.stopVideo():this.playVideo()},playVideo:function(){var a=this;if(!a._d4){var d=a.currSlide;if(!d.videoURL)return!1;var b=a._t6=d.content,d=d.videoURL,f,c;d.match(/youtu\.be/i)||d.match(/youtube\.com\/watch/i)?(c=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,(c=d.match(c))&&11==c[7].length&&(f=c[7]),void 0!==f&&(a._s6=a.st.video.youTubeCode.replace("%id%",f))):d.match(/vimeo\.com/i)&&(c=/\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
(c=d.match(c))&&(f=c[2]),void 0!==f&&(a._s6=a.st.video.vimeoCode.replace("%id%",f)));a.videoObj=e(a._s6);a.ev.trigger("rsOnCreateVideoElement",[d]);a.videoObj.length&&(a._s6=e('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'),a._s6.find(".rsPreloader").after(a.videoObj),b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer"),a._s6.css({width:b.width(),height:b.height()}).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv",
function(b){a.stopVideo();b.preventDefault();b.stopPropagation();return false}),b.append(a._s6),a.isIPAD&&b.addClass("rsIOSVideo"),a._w1&&a.st.video.autoHideArrows&&(a._w1.addClass("rsHidden"),a._x1.addClass("rsHidden"),a._y1=!0),a._t4&&a.st.video.autoHideControlNav&&a._t4.addClass("rsHidden"),a.st.video.autoHideBlocks&&a.currSlide.animBlocks&&a.currSlide.animBlocks.addClass("rsHidden"),setTimeout(function(){a._s6.addClass("rsVideoActive")},10),a.ev.trigger("rsVideoPlay"),a._d4=!0);return!0}return!1},
stopVideo:function(){var a=this;return a._d4?(a.isIPAD&&a.slider.find(".rsCloseVideoBtn").remove(),a._w1&&a.st.video.autoHideArrows&&(a._w1.removeClass("rsHidden"),a._x1.removeClass("rsHidden"),a._y1=!1),a._t4&&a.st.video.autoHideControlNav&&a._t4.removeClass("rsHidden"),a.st.video.autoHideBlocks&&a.currSlide.animBlocks&&a.currSlide.animBlocks.removeClass("rsHidden"),setTimeout(function(){a.ev.trigger("rsOnDestroyVideoElement",[a.videoObj]);a._s6.remove()},16),a.ev.trigger("rsVideoStop"),a._d4=!1,
!0):!1}});e.rsModules.video=e.rsProto._q6})(jQuery);

/* --------------------------------------------------------------------------------------------------------------
	7) Twitter JS v2.0.0 	Copyright (c) 2009 Remy Sharp / MIT License
-------------------------------------------------------------------------------------------------------------- */
typeof getTwitters!="function"&&function(){var a={},b=0;!function(a,b){function m(a){l=1;while(a=c.shift())a()}var c=[],d,e,f=!1,g=b.documentElement,h=g.doScroll,i="DOMContentLoaded",j="addEventListener",k="onreadystatechange",l=/^loade|c/.test(b.readyState);b[j]&&b[j](i,e=function(){b.removeEventListener(i,e,f),m()},f),h&&b.attachEvent(k,d=function(){/^c/.test(b.readyState)&&(b.detachEvent(k,d),m())}),a.domReady=h?function(b){self!=top?l?b():c.push(b):function(){try{g.doScroll("left")}catch(c){return setTimeout(function(){a.domReady(b)},50)}b()}()}:function(a){l?a():c.push(a)}}(a,document),window.getTwitters=function(c,d,e,f){b++,typeof d=="object"&&(f=d,d=f.id,e=f.count),e||(e=1),f?f.count=e:f={},!f.timeout&&typeof f.onTimeout=="function"&&(f.timeout=10),typeof f.clearContents=="undefined"&&(f.clearContents=!0),f.twitterTarget=c,typeof f.enableLinks=="undefined"&&(f.enableLinks=!0),a.domReady(function(a,b){return function(){function f(){a.target=document.getElementById(a.twitterTarget);if(!!a.target){var f={limit:e};f.includeRT&&(f.include_rts=!0),a.timeout&&(window["twitterTimeout"+b]=setTimeout(function(){twitterlib.cancel(),a.onTimeout.call(a.target)},a.timeout*1e3));var g="timeline";d.indexOf("#")===0&&(g="search"),d.indexOf("/")!==-1&&(g="list"),a.ignoreReplies&&(f.filter={not:new RegExp(/^@/)}),twitterlib.cache(!0),twitterlib[g](d,f,function(d,e){clearTimeout(window["twitterTimeout"+b]);var f=[],g=d.length>a.count?a.count:d.length;f=["<ul>"];for(var h=0;h<g;h++){d[h].time=twitterlib.time.relative(d[h].created_at);for(var i in d[h].user)d[h]["user_"+i]=d[h].user[i];a.template?f.push("<li>"+a.template.replace(/%([a-z_\-\.]*)%/ig,function(b,c){var e=d[h][c]+""||"";c=="text"&&(e=twitterlib.expandLinks(d[h])),c=="text"&&a.enableLinks&&(e=twitterlib.ify.clean(e));return e})+"</li>"):a.bigTemplate?f.push(twitterlib.render(d[h])):f.push(c(d[h]))}f.push("</ul>"),a.clearContents?a.target.innerHTML=f.join(""):a.target.innerHTML+=f.join(""),a.callback&&a.callback(d)})}}function c(b){var c=a.enableLinks?twitterlib.ify.clean(twitterlib.expandLinks(b)):twitterlib.expandLinks(b),d="<li>";a.prefix&&(d+='<li><span className="twitterPrefix">',d+=a.prefix.replace(/%(.*?)%/g,function(a,c){return b.user[c]}),d+=" </span></li>"),d+='<span className="twitterStatus">'+twitterlib.time.relative(b.created_at)+"</span> ",d+='<span className="twitterTime">'+b.text+"</span>",a.newwindow&&(d=d.replace(/<a href/gi,'<a target="_blank" href'));return d}typeof twitterlib=="undefined"?setTimeout(function(){var a=document.createElement("script");a.onload=a.onreadystatechange=function(){typeof window.twitterlib!="undefined"&&f()},a.src="http://remy.github.com/twitterlib/twitterlib.js";var b=document.head||document.getElementsByTagName("head")[0];b.insertBefore(a,b.firstChild)},0):f()}}(f,b))}}()



