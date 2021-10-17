if (document.body.getAttribute('pf-init') == null) {
document.body.setAttribute('pf-init', true);

var pfCdnDomain = ''
var pfDomain = ''
var pdfDomain = 'http://fe1.printfriendly.com';
var start = new Date().getTime();
var pfEnv = 'production';
var pfProtocol = document.location.protocol.split(':')[0];
var pfhref  = '';

if(typeof local_dev != "undefined" || typeof local_ie_dev != "undefined") {
    pfCdnDomain = 'http://10.0.0.100:3000';
  pfDomain = 'http://10.0.0.100:3000';
  pdfDomain = 'http://10.0.0.100:3000';
  pfEnv = 'development';
} else if(typeof on_pf_site != 'undefined') {
  pfCdnDomain = localDomain;
  pfDomain = localDomain;
} else {
  if(pfProtocol == 'https') {
    pfCdnDomain = 'https://d75j4zx85lgxs.cloudfront.net';
  } else {
    pfCdnDomain = 'http://cdn.printfriendly.com';
  }
  pfDomain = 'http://www.printfriendly.com';
}


var Pfbrowser = {
  Version: function() {
    var version = 999; // we assume a sane browser
    if (navigator.appVersion.indexOf("MSIE") != -1)
      // bah, IE again, lets downgrade version number
      version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    return version;
  }
}

var priFri = {
  jquerySrc: pfProtocol + '://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js?x=' + (Math.random()),
  readabilitySrc: pfCdnDomain + '/javascripts/v3/readability.js?x=' + (Math.random()) ,
  coreJsSrc: pfCdnDomain + '/javascripts/v3/core.js?x=' + (Math.random()) ,
  pageCssSrc: pfCdnDomain + '/stylesheets/v3/printfriendly.css?x=' + (Math.random()) ,
  pdfSrc: pdfDomain + '/pdfs',
  pdfSrcDirect: pdfDomain + '/print/new_get_pdf',
  emailSrc: pdfDomain + '/email/new',
  bodyCache: null,
  deletedNodes: [],
  deletedNodesCss: [],
  iDoc: null,
  height: 400,
  removeads: false,
  removeImages: false,
  domainCssSrc: null,
  domainJsSrc: null,
  dir: 'ltr',
  onLocal: (typeof on_pf_site != 'undefined'),
  isIE: (Pfbrowser.Version() < 999),
  printId: null,
  specialDomain: false,
  originalBody: null,
  originalHead: null,
  host: null,
  domain: null,
  iframeHeight: 0,

  setPrintSrc: function(domain) {
    priFri.domainCssSrc =  pfCdnDomain + '/stylesheets/v3/custom/' + domain + '.css?x=' + (Math.random());
    priFri.domainJsSrc = pfCdnDomain + '/javascripts/v3/custom/' + domain + '.js?x=' + (Math.random());
  },

  // more or less stolen form jquery core and adapted by paul irish
  getScript: function(url,doc, success){
    var script=doc.createElement('script');
    script.src=url;
    var head=doc.getElementsByTagName('head')[0],
        done=false;
    // Attach handlers for all browsers
    script.onload=script.onreadystatechange = function(){
      if ( !done && (!this.readyState
           || this.readyState == 'loaded'
           || this.readyState == 'complete') ) {
        done=true;
        success();
        script.onload = script.onreadystatechange = null;
        //head.removeChild(script);
      }
    };
    head.appendChild(script);
  },

  hasHtml5Scipt: function() {
    var scripts = document.getElementsByTagName('script');
    for(var i = scripts.length-1; i >= 0; i--)
    {
        if(typeof(scripts[i].src) != 'undefined') {
            if(scripts[i].src.indexOf('html5.js') != -1 || scripts[i].src.indexOf('modernizr') != -1) {
                return true;
            }
        }
    }
    return false;
  },

  refresh: function() {
    try{
      document.body.innerHTML = '<div style="position:absolute; top:0; bottom:0; left:0; right:0; padding:10%; text-align:center; background:#333;"><a href="'+  window.top.location.href +'" style="color:#7a8999; text-decoration:none; font-size:16px; font-family:\'lucida grande\', \'arial\', sans-serif; ">Click If Page Gets Stuck</a></div>';
      window.top.location.href = window.top.location.href.replace("pfstyle=wp",'').replace(/#(.*)$/,'');
    } catch(err) {
      setTimeout(function(){top.location.replace(window.top.location.href.replace("pfstyle=wp",'').replace(/#(.*)$/,''))},100);
    }
  },

  redirect: function() {
    top.location.replace(pfDomain + '/print/v2?url=' + encodeURIComponent(top.location.href));
  }
}

/* deprecated */
var pf = priFri;

function pfinit() {
  var domain, iframe, maskiframe, div;
  domain = document.domain;
//  if(pf.hasHtml5Scipt() && Pfbrowser.Version() < 9) {pf.redirect()}
//  if(pf.hasHtml5Scipt() && pf.isIE) {pf.redirect()}
  if(!priFri.onLocal) {
    priFri.bodyCache = document.body.innerHTML;
    // Blank the document. Fixes some issues with IE
    if(priFri.isIE) {document.body.innerHTML = '<div id="blankfix">&nbsp;</div>'}
//    if(priFri.isIE) {document.body.innerHTML = '<p></p>'}
  } else {
    priFri.bodyCache = $('#original_doc').html();
  }

  div = document.createElement('div');
  div.innerHTML = '<div id="pf-mask" style="z-index: 16777269; position: fixed; top: 0pt; left: 0pt; background-color: rgb(0, 0, 0); opacity: 0.8;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80); height: 100%; width: 100%;"></div>';
  if(priFri.isIE) {
      maskiframe = createIframe('pf-mask-iframe');
      maskiframe.style.position = 'fixed';
      maskiframe.style.top = '-100px';
      maskiframe.style.height = '10000px';
      initializeAndAttach(maskiframe, function() {
            return ['<body style="margin: 0; padding: 0; overflow: hidden">' + div.innerHTML + '</body>'].join('');
          });
  } else {
      document.body.appendChild(div.firstChild);
  }
  iframe = createIframe('pf-init-iframe');
  initializeAndAttach(iframe, function() {
    return ['<body onload="var d=document; ', "var _page_css=document.createElement('link');_page_css.rel='stylesheet';_page_css.type='text/css';_page_css.media='screen';","_page_css.href='" + priFri.pageCssSrc + "';", "var h = d.getElementsByTagName('head')[0];h.appendChild(_page_css);h.appendChild(d.createElement('script')).src='" + priFri.coreJsSrc + "';", '"', '', ' data-domain="', domain, '"></body>'].join('');
  });
};

function initializeAndAttach(iframe, generateContentCallback) {
    var domainSrc, domain;
    domain = document.domain;
    document.body.appendChild(iframe);
    try {
        iframe.contentWindow.document.open;
    } catch (error) {
        domainSrc = "javascript:var d=document.open();d.domain='" + domain + "';";
        iframe.src = domainSrc + "void(0);";
    }

  try {
    var d = iframe.contentWindow.document;
    d.write(generateContentCallback());
    d.close();
  } catch (error) {
    iframe.src = domainSrc + 'd.write("' + generateContentCallback().replace(/"/g, '\\"') + '");d.close();';
  }
}

function createIframe(name) {
  var iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.display = 'block';
  iframe.frameBorder = '0';
  iframe.style.overflow = 'hidden';
  iframe.className = name;
  iframe.allowTransparency = 'true';
  iframe.name = name;
  iframe.id = name;

  return iframe;
}

function onDOMLoad(callback) {
  if (document.body.getAttribute('pf-onload-attached')) {
      return;
  }
  if ( document.readyState === "complete" ) {
    callback();
    return;
  }
  var onReady, onComplete, done, ie_interval,
  d = window.document;
  // For awesome browsers
  if (window.addEventListener) {
      onComplete = function () {
          window.removeEventListener('DOMContentLoaded', onComplete, false);
          window.removeEventListener('load', onComplete, false)
          if (!done) {
              done = true;
              callback();
          }
      };
      window.addEventListener('DOMContentLoaded', onComplete, false);
      window.addEventListener('load', onComplete, false)
  } else {
      if (window.attachEvent) {
          onComplete = function () {
              window.detachEvent('onreadystatechange', onReady);
              window.detachEvent('onload', onComplete);
              if (!done) {
                  done = true;
                  callback();
              }
          };
          onReady = function () {
              if (d.readyState === 'complete') {
                  onComplete();
              }
          };
          // You can only scroll when the document is ready - ugly hack
          //doScrollCheck(onReady);
          window.attachEvent('onreadystatechange', onReady);
          window.attachEvent('onload', onComplete);
      }
  }
  document.body.setAttribute('pf-onload-attached', true);
}

function doScrollCheck(onReady) {
	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( function() {doScrollCheck(onReady)}, 20 );
		return;
	}
  onReady();
}

// required: shim for FF <= 3.5 not having document.readyState
if (document.readyState == null && document.addEventListener) {
    document.readyState = "loading";
    document.addEventListener("DOMContentLoaded", handler = function () {
        document.removeEventListener("DOMContentLoaded", handler, false);
        document.readyState = "complete";
    }, false);
}

if(window.name != 'pfiframe') {
    window.print = function() {
        var timestamp = new Date().getTime();
        // prevent quick consecutive calls since they cause trouble
        if(window.lastCall && (timestamp - window.lastCall < 5000)) {
            return;
        }
        window.lastCall = timestamp;
        onDOMLoad(pfinit)
    }
}

try {pfhref = top.location.href;} catch(e) {pfhref = window.location.href;}

if (typeof pfstyle != "undefined" || pfhref.indexOf('pfstyle=wp') != -1) {
  window.print();
}
}
