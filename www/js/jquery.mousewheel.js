/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 *
 * Requires: 1.2.2+
 */

(function(e){function n(t){var n=t||window.event,r=[].slice.call(arguments,1),i=0,s=true,o=0,u=0;t=e.event.fix(n);t.type="mousewheel";if(t.wheelDelta){i=t.wheelDelta/120}if(t.detail){i=-t.detail/3}u=i;if(n.axis!==undefined&&n.axis===n.HORIZONTAL_AXIS){u=0;o=-1*i}if(n.wheelDeltaY!==undefined){u=n.wheelDeltaY/120}if(n.wheelDeltaX!==undefined){o=-1*n.wheelDeltaX/120}r.unshift(t,i,o,u);return e.event.handle.apply(this,r)}var t=["DOMMouseScroll","mousewheel"];e.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var e=t.length;e;){this.addEventListener(t[--e],n,false)}}else{this.onmousewheel=n}},teardown:function(){if(this.removeEventListener){for(var e=t.length;e;){this.removeEventListener(t[--e],n,false)}}else{this.onmousewheel=null}}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})})(jQuery)