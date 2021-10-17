/* PLUGIN DIRECTORY
What you can find in this file [listed in order they appear]

	1) Invasion of the Body Switchers (http://www.alistapart.com/articles/bodyswitchers/)
	2) Filterable Portfolio (http://www.gethifi.com/blog/a-jquery-plugin-to-create-an-interactive-filterable-portfolio-like-ours)
	3) Infield Label (http://fuelyourcoding.com/scripts/infield/)
  	4) Anchor Slider (http://www.position-absolute.com/articles/better-html-anchor-a-jquery-script-to-slide-the-scrollbar/) 
	5) Twitter.js (http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/)
	6) jQuery Mousewheel (http://plugins.jquery.com/project/mousewheel)
	7) FancyBox (http://fancybox.net/)
	8) HTML5 Grayscale Image Hover (http://webdesignerwall.com/tutorials/html5-grayscale-image-hover)
	9) Scroll to top (http://briancray.com/2009/10/06/scroll-to-top-link-jquery-css/)  

*/

/* --------------------------------------------------------------------------------------------------------------
 	1) Body Switchers (http://www.alistapart.com/articles/bodyswitchers/)
-------------------------------------------------------------------------------------------------------------- */

// Invasion of the Body Switchers
// This copyright statement must remain in place for both personal and commercial use

// Creative Commons License -- http://creativecommons.org/licenses/by-nc-nd/2.0/
// Original concept and article by Malarkey (Andy Clarke) -- http://www.stuffandnonsense.co.uk/
// DOM scripting by Brothercake (James Edwards) -- http://www.brothercake.com/
// Create element and attributes based on a method by beetle -- http://www.peterbailey.net/

//open initialisation function
function iotbs() { switcher = new switchManager();

// Define switching controls

//create a switcher form ('container-id', 'label')
var screenSwitcher = new bodySwitcher('screen-switcher', '');

//add a new class option ('classname', 'label')
screenSwitcher.defineClass('default', 'Pretty in #FF6699');
screenSwitcher.defineClass('myspaced', 'Myspaced');

//close initialisation function
};


//global preferences manager reference
var switcher;


//setup initialisation function
//.. gecko, safari, konqueror and generic
if(typeof window.addEventListener != 'undefined')
{
	window.addEventListener('load', iotbs, false);
}
//.. opera 7
else if(typeof document.addEventListener != 'undefined')
{
	document.addEventListener('load', iotbs, false);
}
//.. win/ie
else if(typeof window.attachEvent != 'undefined')
{
	window.attachEvent('onload', iotbs);
}


//preferences manager 
function switchManager()
{
	//string for storing the overall custom classname
	//I was originally storing it in the body class name directly
	//but 1.7+ mozilla builds were not honouring the trailing whitespace we need
	this.string  = '';
	
	//store reference to body element
	this.body = document.getElementsByTagName('body')[0];

	//store the initial classname
	this.initial = this.body.className;
	
	//if the default classname is empty, add "iotbs"
	//because we need there to be at least one classname already - 
	//the leading and trailing space in each custom classname is required, 
	//but you can't set the body classname as " something" (beginning with a leading space)
	//because that may not work in Opera 7
	if(this.initial == '')
	{
		this.initial = 'itobs';
	}
	
	//look for a stored cookie
	this.cookie = this.read();

	//if it exists
	if(this.cookie != null)
	{
		//store cookie value to string
		this.string = this.cookie;
		
		//set new body class name
		this.body.className = this.initial + this.string;
	}
	
	//*** dev
	//document.title = '<' + this.body.className.replace(/ /g,'+') + '>   [' + this.string.replace(/ /g,'+') + ']';
	
};

//set a cookie method
switchManager.prototype.set = function(days)
{
	//format expiry date
	this.date = new Date();
	this.date.setTime(this.date.getTime() + ( days *24*60*60*1000));
	
	//store the string, replacing spaces with '#' so that leading spaces are preserved
	this.info = this.string.replace(/ /g,'#');
	
	//if the value is empty, set its expiry in the past to delete the cookie
	if(this.info == '') { this.date.setTime(0); }
	
	//create the cookie
	document.cookie = 'bodySwitcher=' + this.info
		+ '; expires=' + this.date.toGMTString() 
		+ '; path=/';
		
};


//read a cookie method
switchManager.prototype.read = function()
{
	//set null reference so we always have something to return
	this.cookie = null;
	
	//if a cookie exists
	if(document.cookie)
	{
		//if it's our cookie
		if(document.cookie.indexOf('bodySwitcher')!=-1)
		{
			//extract and store relevant information (turning '#' back into spaces)
			this.cookie = document.cookie.split('bodySwitcher=');
			this.cookie = this.cookie[1].split(';');
			this.cookie = this.cookie[0].replace(/#/g,' ');
		}
	}
	
	return this.cookie;
};


//switcher form constructor
function bodySwitcher(divid, label)
{

	//create an associate array of classnames for this option
	//so we can later iterate through and remove them from the custom classname string
	this.classes = [];

	//start counting options, because we'll need the index of each option as it's created
	//so that an option can be selected by default if necessary
	this.options = 0;
	
	//outer form
	this.attrs = { 'action' : '' };
	this.form = this.createElement('form', this.attrs);
	document.getElementById(divid).appendChild(this.form);

	//fieldset inside form
	this.fieldset = this.createElement('fieldset');
	this.form.appendChild(this.fieldset);

	//label inside fieldset
	this.attrs = { 'for' : 'select-' + divid };
	this.label = this.createElement('label', this.attrs);
	this.fieldset.appendChild(this.label);

	//span inside label containing label text
	this.attrs = { 'text' : label };
	this.span = this.createElement('span', this.attrs);
	this.label.appendChild(this.span);

	//select inside label
	this.attrs = { 'id' : 'select-' + divid };
	this.select = this.createElement('select', this.attrs);
	this.label.appendChild(this.select);

	//create a global [within this scope] reference to 'this'
	var self = this;

	//bind onchange handler
	this.select.onchange = function()
	{

		//run through classnames array
		this.classLen = self.classes.length;
		for(var i=0; i < this.classLen; i++)
		{
			//remove this key (custom class name) from string
			switcher.string = switcher.string.replace(' ' + self.classes[i] + ' ','');
		}

		//get new value from option
		this.chosen = this.options[this.options.selectedIndex].value;

		//if it isn't default then add to string
		//we need both a leading and a trailing space to work with 
		//to avoid confusion with identical leading or trailing substrings in classnames,
		//such as "high" and "highcontrast" or "large-serif" and "small-serif"
		if(this.chosen != 'default')
		{
			switcher.string += ' ' + this.chosen + ' ';	
		}
		
		//set new body class name
		switcher.body.className = switcher.initial + switcher.string;

		//store changes to a cookie which expires a year from now
		switcher.set(365)
		
		//*** dev
		//document.title = '<' + switcher.body.className.replace(/ /g,'+') + '>   [' + switcher.string.replace(/ /g,'+') + ']';

	};

};

//add a new class option method
bodySwitcher.prototype.defineClass = function(key, val)
{
	//option inside select
	this.attrs = { 'value' : key, 'text' : val }; 
	this.option = this.createElement('option', this.attrs);
	this.select.appendChild(this.option);

	//check for cookie value 
	if(switcher.cookie != null)
	{
		//if value contains this key
		if(switcher.cookie.indexOf(' ' + key + ' ')!=-1)
		{
			//select this option
			this.select.selectedIndex = this.options;
		}
	}
	
	//store the classname 
	this.classes[this.options] = key;

	//increase option count
	this.options ++;

};

//create element and attributes method -- http://www.codingforums.com/showthread.php?s=&postid=151108
bodySwitcher.prototype.createElement = function(tag, attrs)
{
	//detect support for namespaced element creation, in case we're in the XML DOM
	this.ele = (typeof document.createElementNS != 'undefined') ? document.createElementNS('http://www.w3.org/1999/xhtml',tag) : document.createElement(tag);

	//run through attributes argument
	if(typeof attrs != 'undefined')
	{
		for(var i in attrs)
		{
			switch(i)
			{
				//create a text node
				case 'text' :
					this.ele.appendChild(document.createTextNode(attrs[i]));
					break;
				
				//create a class name
				case 'class' : 
					this.ele.className = attrs[i];
					break;
				
				//create a for attribute 
				case 'for' : 
					this.ele.setAttribute('htmlFor',attrs[i]);
					break;
				
				//create a generic attribute using IE-safe attribute creation
				default : 
					this.ele.setAttribute(i,'');
					this.ele[i] = attrs[i];
					break;
			}
		}
	}
	return this.ele;
};


/* --------------------------------------------------------------------------------------------------------------
	2) Filterable Portfolio (Copyright (C) 2009 Joel Sutherland)	 
-------------------------------------------------------------------------------------------------------------- */

(function($){$.fn.filterable=function(settings){settings=$.extend({useHash:true,animationSpeed:1000,show:{width:'show',opacity:'show'},hide:{width:'hide',opacity:'hide'},useTags:true,tagSelector:'#portfolio-filter a',selectedTagClass:'current',allTag:'all'},settings);return $(this).each(function(){$(this).bind("filter",function(e,tagToShow){if(settings.useTags){$(settings.tagSelector).removeClass(settings.selectedTagClass);$(settings.tagSelector+'[href='+tagToShow+']').addClass(settings.selectedTagClass)}$(this).trigger("filterportfolio",[tagToShow.substr(1)])});$(this).bind("filterportfolio",function(e,classToShow){if(classToShow==settings.allTag){$(this).trigger("show")}else{$(this).trigger("show",['.'+classToShow]);$(this).trigger("hide",[':not(.'+classToShow+')'])}if(settings.useHash){location.hash='#'+classToShow}});$(this).bind("show",function(e,selectorToShow){$(this).children(selectorToShow).animate(settings.show,settings.animationSpeed)});$(this).bind("hide",function(e,selectorToHide){$(this).children(selectorToHide).animate(settings.hide,settings.animationSpeed)});if(settings.useHash){if(location.hash!='')$(this).trigger("filter",[location.hash]);else $(this).trigger("filter",['#'+settings.allTag])}if(settings.useTags){$(settings.tagSelector).click(function(){$('#portfolio-list').trigger("filter",[$(this).attr('href')]);$(settings.tagSelector).removeClass('current');$(this).addClass('current')})}})}})(jQuery);$(document).ready(function(){$('#portfolio-list').filterable()});

/* ---------------------------------------------------------------------------------------------------------------
	3) In-Field Label jQuery Plugin (http://fuelyourcoding.com/scripts/infield.html)	 
-------------------------------------------------------------------------------------------------------------- */

(function($){
	
    $.InFieldLabels = function(label,field, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of each element
        base.$label = $(label);
        base.label = label;

 		base.$field = $(field);
		base.field = field;
        
		base.$label.data("InFieldLabels", base);
		base.showing = true;
        
        base.init = function(){
			// Merge supplied options with default options
            base.options = $.extend({},$.InFieldLabels.defaultOptions, options);

			// Check if the field is already filled in
			if(base.$field.val() != ""){
				base.$label.hide();
				base.showing = false;
			};
			
			base.$field.focus(function(){
				base.fadeOnFocus();
			}).blur(function(){
				base.checkForEmpty(true);
			}).bind('keydown.infieldlabel',function(e){
				// Use of a namespace (.infieldlabel) allows us to
				// unbind just this method later
				base.hideOnChange(e);
			}).change(function(e){
				base.checkForEmpty();
			}).bind('onPropertyChange', function(){
				base.checkForEmpty();
			});
        };

		// If the label is currently showing
		// then fade it down to the amount
		// specified in the settings
		base.fadeOnFocus = function(){
			if(base.showing){
				base.setOpacity(base.options.fadeOpacity);
			};
		};
		
		base.setOpacity = function(opacity){
			base.$label.stop().animate({ opacity: opacity }, base.options.fadeDuration);
			base.showing = (opacity > 0.0);
		};
		
		// Checks for empty as a fail safe
		// set blur to true when passing from
		// the blur event
		base.checkForEmpty = function(blur){
			if(base.$field.val() == ""){
				base.prepForShow();
				base.setOpacity( blur ? 1.0 : base.options.fadeOpacity );
			} else {
				base.setOpacity(0.0);
			};
		};
		
		base.prepForShow = function(e){
			if(!base.showing) {
				// Prepare for a animate in...
				base.$label.css({opacity: 0.0}).show();
				
				// Reattach the keydown event
				base.$field.bind('keydown.infieldlabel',function(e){
					base.hideOnChange(e);
				});
			};
		};

		base.hideOnChange = function(e){
			if(
				(e.keyCode == 16) || // Skip Shift
				(e.keyCode == 9) // Skip Tab
			  ) return; 
			
			if(base.showing){
				base.$label.hide();
				base.showing = false;
			};
			
			// Remove keydown event to save on CPU processing
			base.$field.unbind('keydown.infieldlabel');
		};
      
		// Run the initialization method
        base.init();
    };
	
    $.InFieldLabels.defaultOptions = {
        fadeOpacity: 0.5, // Once a field has focus, how transparent should the label be
		fadeDuration: 300 // How long should it take to animate from 1.0 opacity to the fadeOpacity
    };
	

    $.fn.inFieldLabels = function(options){
        return this.each(function(){
			// Find input or textarea based on for= attribute
			// The for attribute on the label must contain the ID
			// of the input or textarea element
			var for_attr = $(this).attr('for');
			if( !for_attr ) return; // Nothing to attach, since the for field wasn't used
			
			
			// Find the referenced input or textarea element
			var $field = $(
				"input#" + for_attr + "[type='text']," + 
				"input#" + for_attr + "[type='password']," + 
				"textarea#" + for_attr
				);
				
			if( $field.length == 0) return; // Again, nothing to attach
			
			// Only create object for input[text], input[password], or textarea
            (new $.InFieldLabels(this, $field[0], options));
        });
    };
	
})(jQuery);

$(document).ready(function(){
  $("label").inFieldLabels();
});


/* --------------------------------------------------------------------------------------------------------------
	4) Anchor Slider (http://www.position-absolute.com) 
-------------------------------------------------------------------------------------------------------------- */

$(document).ready(function() {
	$("a.anchorLink").anchorAnimate()
});

jQuery.fn.anchorAnimate = function(settings) {

 	settings = jQuery.extend({
		speed : 1100
	}, settings);	
	
	return this.each(function(){
		var caller = this
		$(caller).click(function (event) {	
			event.preventDefault()
			var locationHref = window.location.href
			var elementClick = $(caller).attr("href")
			
			var destination = $(elementClick).offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
				window.location.hash = elementClick
			});
		  	return false;
		})
	})
}

/* --------------------------------------------------------------------------------------------------------------
	5) Twitter JS (http://code.google.com/p/twitterjs/)	 
-------------------------------------------------------------------------------------------------------------- */

typeof getTwitters!="function"&&function(){var a={},b=0;!function(a,b){function m(a){l=1;while(a=c.shift())a()}var c=[],d,e,f=!1,g=b.documentElement,h=g.doScroll,i="DOMContentLoaded",j="addEventListener",k="onreadystatechange",l=/^loade|c/.test(b.readyState);b[j]&&b[j](i,e=function(){b.removeEventListener(i,e,f),m()},f),h&&b.attachEvent(k,d=function(){/^c/.test(b.readyState)&&(b.detachEvent(k,d),m())}),a.domReady=h?function(b){self!=top?l?b():c.push(b):function(){try{g.doScroll("left")}catch(c){return setTimeout(function(){a.domReady(b)},50)}b()}()}:function(a){l?a():c.push(a)}}(a,document),window.getTwitters=function(c,d,e,f){b++,typeof d=="object"&&(f=d,d=f.id,e=f.count),e||(e=1),f?f.count=e:f={},!f.timeout&&typeof f.onTimeout=="function"&&(f.timeout=10),typeof f.clearContents=="undefined"&&(f.clearContents=!0),f.twitterTarget=c,typeof f.enableLinks=="undefined"&&(f.enableLinks=!0),a.domReady(function(a,b){return function(){function f(){a.target=document.getElementById(a.twitterTarget);if(!!a.target){var f={limit:e};f.includeRT&&(f.include_rts=!0),a.timeout&&(window["twitterTimeout"+b]=setTimeout(function(){twitterlib.cancel(),a.onTimeout.call(a.target)},a.timeout*1e3));var g="timeline";d.indexOf("#")===0&&(g="search"),d.indexOf("/")!==-1&&(g="list"),a.ignoreReplies&&(f.filter={not:new RegExp(/^@/)}),twitterlib.cache(!0),twitterlib[g](d,f,function(d,e){clearTimeout(window["twitterTimeout"+b]);var f=[],g=d.length>a.count?a.count:d.length;f=["<ul>"];for(var h=0;h<g;h++){d[h].time=twitterlib.time.relative(d[h].created_at);for(var i in d[h].user)d[h]["user_"+i]=d[h].user[i];a.template?f.push("<li>"+a.template.replace(/%([a-z_\-\.]*)%/ig,function(b,c){var e=d[h][c]+""||"";c=="text"&&(e=twitterlib.expandLinks(d[h])),c=="text"&&a.enableLinks&&(e=twitterlib.ify.clean(e));return e})+"</li>"):a.bigTemplate?f.push(twitterlib.render(d[h])):f.push(c(d[h]))}f.push("</ul>"),a.clearContents?a.target.innerHTML=f.join(""):a.target.innerHTML+=f.join(""),a.callback&&a.callback(d)})}}function c(b){var c=a.enableLinks?twitterlib.ify.clean(twitterlib.expandLinks(b)):twitterlib.expandLinks(b),d="<li>";a.prefix&&(d+='<li><span className="twitterPrefix">',d+=a.prefix.replace(/%(.*?)%/g,function(a,c){return b.user[c]}),d+=" </span></li>"),d+='<span className="twitterStatus">'+twitterlib.time.relative(b.created_at)+"</span> ",d+='<span className="twitterTime">'+b.text+"</span>",a.newwindow&&(d=d.replace(/<a href/gi,'<a target="_blank" href'));return d}typeof twitterlib=="undefined"?setTimeout(function(){var a=document.createElement("script");a.onload=a.onreadystatechange=function(){typeof window.twitterlib!="undefined"&&f()},a.src="http://remy.github.com/twitterlib/twitterlib.js";var b=document.head||document.getElementsByTagName("head")[0];b.insertBefore(a,b.firstChild)},0):f()}}(f,b))}}()

	getTwitters('tweet', { 
		id: 'minamarkham', 
		count: 1, 
		enableLinks: true, 
		ignoreReplies: true, 
		clearContents: true,
		template: '"%text%"<br/><a href="http://twitter.com/%user_screen_name%/statuses/%id_str%/">%time%</a>'
	});


/* --------------------------------------------------------------------------------------------------------------
	6) jQuery Mousewheel (http://plugins.jquery.com/project/mousewheel)	 
-------------------------------------------------------------------------------------------------------------- */

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

(function(d){function g(a){var b=a||window.event,i=[].slice.call(arguments,1),c=0,h=0,e=0;a=d.event.fix(b);a.type="mousewheel";if(a.wheelDelta)c=a.wheelDelta/120;if(a.detail)c=-a.detail/3;e=c;if(b.axis!==undefined&&b.axis===b.HORIZONTAL_AXIS){e=0;h=-1*c}if(b.wheelDeltaY!==undefined)e=b.wheelDeltaY/120;if(b.wheelDeltaX!==undefined)h=-1*b.wheelDeltaX/120;i.unshift(a,c,h,e);return d.event.handle.apply(this,i)}var f=["DOMMouseScroll","mousewheel"];d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=
f.length;a;)this.addEventListener(f[--a],g,false);else this.onmousewheel=g},teardown:function(){if(this.removeEventListener)for(var a=f.length;a;)this.removeEventListener(f[--a],g,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);


/* --------------------------------------------------------------------------------------------------------------
	7) FancyBox - jQuery Plugin (http://fancybox.net)	 
-------------------------------------------------------------------------------------------------------------- */

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 * 
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function(b){var m,t,u,f,D,j,E,n,z,A,q=0,e={},o=[],p=0,d={},l=[],G=null,v=new Image,J=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,W=/[^\.]\.(swf)\s*$/i,K,L=1,y=0,s="",r,i,h=false,B=b.extend(b("<div/>")[0],{prop:0}),M=b.browser.msie&&b.browser.version<7&&!window.XMLHttpRequest,N=function(){t.hide();v.onerror=v.onload=null;G&&G.abort();m.empty()},O=function(){if(false===e.onError(o,q,e)){t.hide();h=false}else{e.titleShow=false;e.width="auto";e.height="auto";m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
F()}},I=function(){var a=o[q],c,g,k,C,P,w;N();e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));w=e.onStart(o,q,e);if(w===false)h=false;else{if(typeof w=="object")e=b.extend(e,w);k=e.title||(a.nodeName?b(a).attr("title"):a.title)||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?b(a).children("img:first"):b(a);if(k===""&&e.orig&&e.titleFromAlt)k=e.orig.attr("alt");c=e.href||(a.nodeName?b(a).attr("href"):a.href)||null;if(/^(?:javascript)/i.test(c)||
c=="#")c=null;if(e.type){g=e.type;if(!c)c=e.content}else if(e.content)g="html";else if(c)g=c.match(J)?"image":c.match(W)?"swf":b(a).hasClass("iframe")?"iframe":c.indexOf("#")===0?"inline":"ajax";if(g){if(g=="inline"){a=c.substr(c.indexOf("#"));g=b(a).length>0?"inline":"ajax"}e.type=g;e.href=c;e.title=k;if(e.autoDimensions)if(e.type=="html"||e.type=="inline"||e.type=="ajax"){e.width="auto";e.height="auto"}else e.autoDimensions=false;if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=
false;e.enableEscapeButton=false;e.showCloseButton=false}e.padding=parseInt(e.padding,10);e.margin=parseInt(e.margin,10);m.css("padding",e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(j.children())});switch(g){case "html":m.html(e.content);F();break;case "inline":if(b(a).parent().is("#fancybox-content")===true){h=false;break}b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",function(){b(this).replaceWith(j.children())}).bind("fancybox-cancel",
function(){b(this).replaceWith(m.children())});b(a).appendTo(m);F();break;case "image":h=false;b.fancybox.showActivity();v=new Image;v.onerror=function(){O()};v.onload=function(){h=true;v.onerror=v.onload=null;e.width=v.width;e.height=v.height;b("<img />").attr({id:"fancybox-img",src:v.src,alt:e.title}).appendTo(m);Q()};v.src=c;break;case "swf":e.scrolling="no";C='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+c+
'"></param>';P="";b.each(e.swf,function(x,H){C+='<param name="'+x+'" value="'+H+'"></param>';P+=" "+x+'="'+H+'"'});C+='<embed src="'+c+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+P+"></embed></object>";m.html(C);F();break;case "ajax":h=false;b.fancybox.showActivity();e.ajax.win=e.ajax.success;G=b.ajax(b.extend({},e.ajax,{url:c,data:e.ajax.data||{},error:function(x){x.status>0&&O()},success:function(x,H,R){if((typeof R=="object"?R:G).status==200){if(typeof e.ajax.win==
"function"){w=e.ajax.win(c,x,H,R);if(w===false){t.hide();return}else if(typeof w=="string"||typeof w=="object")x=w}m.html(x);F()}}}));break;case "iframe":Q()}}else O()}},F=function(){var a=e.width,c=e.height;a=a.toString().indexOf("%")>-1?parseInt((b(window).width()-e.margin*2)*parseFloat(a)/100,10)+"px":a=="auto"?"auto":a+"px";c=c.toString().indexOf("%")>-1?parseInt((b(window).height()-e.margin*2)*parseFloat(c)/100,10)+"px":c=="auto"?"auto":c+"px";m.wrapInner('<div style="width:'+a+";height:"+c+
";overflow: "+(e.scrolling=="auto"?"auto":e.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');e.width=m.width();e.height=m.height();Q()},Q=function(){var a,c;t.hide();if(f.is(":visible")&&false===d.onCleanup(l,p,d)){b.event.trigger("fancybox-cancel");h=false}else{h=true;b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");f.is(":visible")&&d.titlePosition!=="outside"&&f.css("height",f.height());l=o;p=q;d=e;if(d.overlayShow){u.css({"background-color":d.overlayColor,
opacity:d.overlayOpacity,cursor:d.hideOnOverlayClick?"pointer":"auto",height:b(document).height()});if(!u.is(":visible")){M&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});u.show()}}else u.hide();i=X();s=d.title||"";y=0;n.empty().removeAttr("style").removeClass();if(d.titleShow!==false){if(b.isFunction(d.titleFormat))a=d.titleFormat(s,l,p,d);else a=s&&s.length?
d.titlePosition=="float"?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+s+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+d.titlePosition+'">'+s+"</div>":false;s=a;if(!(!s||s==="")){n.addClass("fancybox-title-"+d.titlePosition).html(s).appendTo("body").show();switch(d.titlePosition){case "inside":n.css({width:i.width-d.padding*2,marginLeft:d.padding,marginRight:d.padding});
y=n.outerHeight(true);n.appendTo(D);i.height+=y;break;case "over":n.css({marginLeft:d.padding,width:i.width-d.padding*2,bottom:d.padding}).appendTo(D);break;case "float":n.css("left",parseInt((n.width()-i.width-40)/2,10)*-1).appendTo(f);break;default:n.css({width:i.width-d.padding*2,paddingLeft:d.padding,paddingRight:d.padding}).appendTo(f)}}}n.hide();if(f.is(":visible")){b(E.add(z).add(A)).hide();a=f.position();r={top:a.top,left:a.left,width:f.width(),height:f.height()};c=r.width==i.width&&r.height==
i.height;j.fadeTo(d.changeFade,0.3,function(){var g=function(){j.html(m.contents()).fadeTo(d.changeFade,1,S)};b.event.trigger("fancybox-change");j.empty().removeAttr("filter").css({"border-width":d.padding,width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2});if(c)g();else{B.prop=0;b(B).animate({prop:1},{duration:d.changeSpeed,easing:d.easingChange,step:T,complete:g})}})}else{f.removeAttr("style");j.css("border-width",d.padding);if(d.transitionIn=="elastic"){r=V();j.html(m.contents());
f.show();if(d.opacity)i.opacity=0;B.prop=0;b(B).animate({prop:1},{duration:d.speedIn,easing:d.easingIn,step:T,complete:S})}else{d.titlePosition=="inside"&&y>0&&n.show();j.css({width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2}).html(m.contents());f.css(i).fadeIn(d.transitionIn=="none"?0:d.speedIn,S)}}}},Y=function(){if(d.enableEscapeButton||d.enableKeyboardNav)b(document).bind("keydown.fb",function(a){if(a.keyCode==27&&d.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if((a.keyCode==
37||a.keyCode==39)&&d.enableKeyboardNav&&a.target.tagName!=="INPUT"&&a.target.tagName!=="TEXTAREA"&&a.target.tagName!=="SELECT"){a.preventDefault();b.fancybox[a.keyCode==37?"prev":"next"]()}});if(d.showNavArrows){if(d.cyclic&&l.length>1||p!==0)z.show();if(d.cyclic&&l.length>1||p!=l.length-1)A.show()}else{z.hide();A.hide()}},S=function(){if(!b.support.opacity){j.get(0).style.removeAttribute("filter");f.get(0).style.removeAttribute("filter")}e.autoDimensions&&j.css("height","auto");f.css("height","auto");
s&&s.length&&n.show();d.showCloseButton&&E.show();Y();d.hideOnContentClick&&j.bind("click",b.fancybox.close);d.hideOnOverlayClick&&u.bind("click",b.fancybox.close);b(window).bind("resize.fb",b.fancybox.resize);d.centerOnScroll&&b(window).bind("scroll.fb",b.fancybox.center);if(d.type=="iframe")b('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(b.browser.msie?'allowtransparency="true""':"")+' scrolling="'+e.scrolling+'" src="'+d.href+'"></iframe>').appendTo(j);
f.show();h=false;b.fancybox.center();d.onComplete(l,p,d);var a,c;if(l.length-1>p){a=l[p+1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}if(p>0){a=l[p-1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}},T=function(a){var c={width:parseInt(r.width+(i.width-r.width)*a,10),height:parseInt(r.height+(i.height-r.height)*a,10),top:parseInt(r.top+(i.top-r.top)*a,10),left:parseInt(r.left+(i.left-r.left)*a,10)};if(typeof i.opacity!=="undefined")c.opacity=a<0.5?0.5:a;f.css(c);
j.css({width:c.width-d.padding*2,height:c.height-y*a-d.padding*2})},U=function(){return[b(window).width()-d.margin*2,b(window).height()-d.margin*2,b(document).scrollLeft()+d.margin,b(document).scrollTop()+d.margin]},X=function(){var a=U(),c={},g=d.autoScale,k=d.padding*2;c.width=d.width.toString().indexOf("%")>-1?parseInt(a[0]*parseFloat(d.width)/100,10):d.width+k;c.height=d.height.toString().indexOf("%")>-1?parseInt(a[1]*parseFloat(d.height)/100,10):d.height+k;if(g&&(c.width>a[0]||c.height>a[1]))if(e.type==
"image"||e.type=="swf"){g=d.width/d.height;if(c.width>a[0]){c.width=a[0];c.height=parseInt((c.width-k)/g+k,10)}if(c.height>a[1]){c.height=a[1];c.width=parseInt((c.height-k)*g+k,10)}}else{c.width=Math.min(c.width,a[0]);c.height=Math.min(c.height,a[1])}c.top=parseInt(Math.max(a[3]-20,a[3]+(a[1]-c.height-40)*0.5),10);c.left=parseInt(Math.max(a[2]-20,a[2]+(a[0]-c.width-40)*0.5),10);return c},V=function(){var a=e.orig?b(e.orig):false,c={};if(a&&a.length){c=a.offset();c.top+=parseInt(a.css("paddingTop"),
10)||0;c.left+=parseInt(a.css("paddingLeft"),10)||0;c.top+=parseInt(a.css("border-top-width"),10)||0;c.left+=parseInt(a.css("border-left-width"),10)||0;c.width=a.width();c.height=a.height();c={width:c.width+d.padding*2,height:c.height+d.padding*2,top:c.top-d.padding-20,left:c.left-d.padding-20}}else{a=U();c={width:d.padding*2,height:d.padding*2,top:parseInt(a[3]+a[1]*0.5,10),left:parseInt(a[2]+a[0]*0.5,10)}}return c},Z=function(){if(t.is(":visible")){b("div",t).css("top",L*-40+"px");L=(L+1)%12}else clearInterval(K)};
b.fn.fancybox=function(a){if(!b(this).length)return this;b(this).data("fancybox",b.extend({},a,b.metadata?b(this).metadata():{})).unbind("click.fb").bind("click.fb",function(c){c.preventDefault();if(!h){h=true;b(this).blur();o=[];q=0;c=b(this).attr("rel")||"";if(!c||c==""||c==="nofollow")o.push(this);else{o=b("a[rel="+c+"], area[rel="+c+"]");q=o.index(this)}I()}});return this};b.fancybox=function(a,c){var g;if(!h){h=true;g=typeof c!=="undefined"?c:{};o=[];q=parseInt(g.index,10)||0;if(b.isArray(a)){for(var k=
0,C=a.length;k<C;k++)if(typeof a[k]=="object")b(a[k]).data("fancybox",b.extend({},g,a[k]));else a[k]=b({}).data("fancybox",b.extend({content:a[k]},g));o=jQuery.merge(o,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},g,a));else a=b({}).data("fancybox",b.extend({content:a},g));o.push(a)}if(q>o.length||q<0)q=0;I()}};b.fancybox.showActivity=function(){clearInterval(K);t.show();K=setInterval(Z,66)};b.fancybox.hideActivity=function(){t.hide()};b.fancybox.next=function(){return b.fancybox.pos(p+
1)};b.fancybox.prev=function(){return b.fancybox.pos(p-1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a);o=l;if(a>-1&&a<l.length){q=a;I()}else if(d.cyclic&&l.length>1){q=a>=l.length?0:l.length-1;I()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");N();e.onCancel(o,q,e);h=false}};b.fancybox.close=function(){function a(){u.fadeOut("fast");n.empty().hide();f.hide();b.event.trigger("fancybox-cleanup");j.empty();d.onClosed(l,p,d);l=e=[];p=q=0;d=e={};h=false}if(!(h||f.is(":hidden"))){h=
true;if(d&&false===d.onCleanup(l,p,d))h=false;else{N();b(E.add(z).add(A)).hide();b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");j.find("iframe").attr("src",M&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");d.titlePosition!=="inside"&&n.empty();f.stop();if(d.transitionOut=="elastic"){r=V();var c=f.position();i={top:c.top,left:c.left,width:f.width(),height:f.height()};if(d.opacity)i.opacity=1;n.empty().hide();B.prop=1;
b(B).animate({prop:0},{duration:d.speedOut,easing:d.easingOut,step:T,complete:a})}else f.fadeOut(d.transitionOut=="none"?0:d.speedOut,a)}}};b.fancybox.resize=function(){u.is(":visible")&&u.css("height",b(document).height());b.fancybox.center(true)};b.fancybox.center=function(a){var c,g;if(!h){g=a===true?1:0;c=U();!g&&(f.width()>c[0]||f.height()>c[1])||f.stop().animate({top:parseInt(Math.max(c[3]-20,c[3]+(c[1]-j.height()-40)*0.5-d.padding)),left:parseInt(Math.max(c[2]-20,c[2]+(c[0]-j.width()-40)*0.5-
d.padding))},typeof a=="number"?a:200)}};b.fancybox.init=function(){if(!b("#fancybox-wrap").length){b("body").append(m=b('<div id="fancybox-tmp"></div>'),t=b('<div id="fancybox-loading"><div></div></div>'),u=b('<div id="fancybox-overlay"></div>'),f=b('<div id="fancybox-wrap"></div>'));D=b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
D.append(j=b('<div id="fancybox-content"></div>'),E=b('<a id="fancybox-close"></a>'),n=b('<div id="fancybox-title"></div>'),z=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),A=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));E.click(b.fancybox.close);t.click(b.fancybox.cancel);z.click(function(a){a.preventDefault();b.fancybox.prev()});A.click(function(a){a.preventDefault();b.fancybox.next()});
b.fn.mousewheel&&f.bind("mousewheel.fb",function(a,c){if(h)a.preventDefault();else if(b(a.target).get(0).clientHeight==0||b(a.target).get(0).scrollHeight===b(a.target).get(0).clientHeight){a.preventDefault();b.fancybox[c>0?"prev":"next"]()}});b.support.opacity||f.addClass("fancybox-ie");if(M){t.addClass("fancybox-ie6");f.addClass("fancybox-ie6");b('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)}}};
b.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",
easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};b(document).ready(function(){b.fancybox.init()})})(jQuery);

		$(document).ready(function() {
			$("a.thumb").fancybox({
				'overlayShow'	: true,
				'titlePosition'		: 'inside',
				'overlayColor'		: '#000',
				'overlayOpacity'	: 0.8
			});
			$("a.iframe").fancybox({
				'width'				: '75%',
				'height'			: '100%',
				'autoScale'     	: false,
				'type'				: 'iframe',
				'hideOnContentClick'	: 'false'
			});
			$("a#inline").fancybox({
				'hideOnContentClick': true
			});
				$("a.gallery1").fancybox({
				'overlayShow'	: true,
				'titlePosition'		: 'inside',
				'overlayColor'		: '#000',
				'overlayOpacity'	: 0.8
			});
			$("a.gallery2").fancybox({
				'overlayShow'	: true,
				'titlePosition'		: 'inside',
				'overlayColor'		: '#000',
				'overlayOpacity'	: 0.8
			});
		});

/* --------------------------------------------------------------------------------------------------------------
	8) HTML5 Grayscale Image Hover (http://webdesignerwall.com/tutorials/html5-grayscale-image-hover)	 
-------------------------------------------------------------------------------------------------------------- */

	// On window load. This waits until images have loaded which is essential
	$(window).load(function(){
		
		// Fade in images so there isn't a color "pop" document load and then on window load
		$("a.thumb img").fadeIn(500);
		
		// clone image
		$('a.thumb img').each(function(){
			var el = $(this);
			el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
				var el = $(this);
				el.parent().css({"width":this.width,"height":this.height});
				el.dequeue();
			});
			this.src = grayscale(this.src);
		});
		
		// Fade image 
		$('a.thumb img').mouseover(function(){
			$(this).parent().find('img:first').stop().animate({opacity:1}, 1000);
		})
		$('.img_grayscale').mouseout(function(){
			$(this).stop().animate({opacity:0}, 1000);
		});		
	});
	
	// Grayscale w canvas method
	function grayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
    }


/* --------------------------------------------------------------------------------------------------------------
 	9) Scroll to top (http://briancray.com/2009/10/06/scroll-to-top-link-jquery-css/)
-------------------------------------------------------------------------------------------------------------- */

$(function () {
	var scroll_timer;
	var displayed = false;
	var $message = $('#toTop a');
	var $window = $(window);
	var top = $(document.body).children(0).position().top;
	$window.scroll(function () {
		window.clearTimeout(scroll_timer);
		scroll_timer = window.setTimeout(function () {
			if($window.scrollTop() <= top)
			{
				displayed = false;
				$message.fadeOut(500);
			}
			else if(displayed == false)
			{
				displayed = true;
				$message.stop(true, true).show().click(function () { $message.fadeOut(500); });
			}
		}, 100);
	});
});