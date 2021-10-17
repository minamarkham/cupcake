$(document).ready(function() {

  // add emoji to url
  function addEmoji() {
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
      window.location.hash = "💋";
    }
  };

  addEmoji();

  // copyright year
  $("#year").text( (new Date).getFullYear() );

  // Responsive Nav
  var navigation = responsiveNav("#nav", {
    animate: true,                    // Boolean: Use CSS3 transitions, true or false
    transition: 284,                  // Integer: Speed of the transition, in milliseconds
    label: "Menu",                    // String: Label for the navigation toggle
    insert: "before",                  // String: Insert the toggle before or after the navigation
    customToggle: "",                 // Selector: Specify the ID of a custom toggle
    closeOnNavClick: false,           // Boolean: Close the navigation when one of the links are clicked
    openPos: "relative",              // String: Position of the opened nav, relative or static
    navClass: "nav-collapse",         // String: Default CSS class. If changed, you need to edit the CSS too!
    navActiveClass: "js-nav-active",  // String: Class that is added to <html> element when nav is active
    jsClass: "js",                    // String: 'JS enabled' class which is added to <html> element
  });

  // FitVid.js
  $(".main-container").fitVids();
     
  // Fix Widows
  $('p').widowFix();   
 	  
  //  I AM STATEMENTS

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
    'a front-end architect',
    'a <a href="http://sass-lang.com">Sasstronaut</a>',
    'a <a href="http://girldevelopit.com">teacher</a>',
    '<a href="/speaking/">a speaker</a>',
    '<a href="http://www.buzzfeed.com/kmallikarjuna/27-signs-youre-a-browncoat">a browncoat</a>',
    '<a href="http://en.wikipedia.org/wiki/INFP">an INFP</a>',
    'a <a href="http://sexyfeminist.com/">sexy feminist</a>',
    'a geek in pink',
    'a brown skin lady',
    'a <a href="http://steminist.com/">STEMinist</a>'
    //'<a href="contact">looking for work!</a>',
    //'<a href="/evolving/">evolving</a>',
    //'<a href="/supersingle/">super single</a>',
    //'<a href="/rambling/">rambling</a>',
    //'<a href="/baking/">a baker of cupcakes</a>',
    //'<a href="/helpful/">helpful</a>',
  ];
  $('#statement').randomText( textArray, 3500 ); // ( array, interval )
  //$('#refresh').on(clickEvent, Application.remark.spin);

  //  Recent/Past Talks

  var talks = [
    {
      "name"      : "Squares Conference",
      "url"       : "http://squaresconference.com/",
      "date"      : "March 25-27",
      "year"      : "2015",
      "location"  : "Grapevine, TX",
      "type"      : "workshop"
    },
    {
      "name"      : "Camp Sass",
      "url"       : "http://campsass.com/",
      "date"      : "April 4",
      "year"      : "2015",
      "location"  : "Atlanta, GA",
      "type"      : "talk"
    },
    {
      "name"      : "Converge SE",
      "url"       : "http://convergese.com/",
      "date"      : "April 15-18",
      "year"      : "2015",
      "location"  : "Columbia, SC",
      "type"      : "talk"
    },
    {
      "name"      : "O'Reilly Fluent Conference",
      "url"       : "http://fluentconf.com/",
      "date"      : "April 20-22",
      "year"      : "2015",
      "location"  : "San Francisco, CA",
      "type"      : "talk"
    },
    {
      "name"      : "Collision Conference",
      "url"       : "http://collisionconf.com/",
      "date"      : "May 5-6",
      "year"      : "2015",
      "location"  : "Las Vegas, NV",
      "type"      : "talk"
    },
    {
      "name"      : "CSS Dev Conference",
      "url"       : "http://2015.cssdevconf.com/",
      "date"      : "October 26-28",
      "year"      : "2015",
      "location"  : "Long Beach, CA",
      "type"      : "workshop"
    },
    {
      "name"      : "Sass Summit",
      "url"       : "http://environmentsforhumans.com/2014/sass-summit/",
      "date"      : "November 6",
      "year"      : "2014",
      "location"  : "Online",
      "type"      : "talk"
    },
    {
      "name"      : "Front Porch",
      "url"       : "http://frontporch.io",
      "date"      : "October 7",
      "year"      : "2014",
      "location"  : "Dallas, TX",
      "type"      : "talk"
    },
    {
      "name"      : "That Conference",
      "url"       : "http://thatconference.com/",
      "date"      : "August 11-13",
      "year"      : "2014",
      "location"  : "Wisconsin Dells, WI",
      "type"      : "talk"
    },
    {
      "name"      : "Distill",
      "url"       : "http://distill.engineyard.com/",
      "date"      : "August 7-8",
      "year"      : "2014",
      "location"  : "San Francisco, CA",
      "type"      : "talk"
    },
    {
      "name"      : "Midwest.io",
      "url"       : "http://midwest.io/",
      "date"      : "July 14-15",
      "year"      : "2014",
      "location"  : "Kansas City, MO",
      "type"      : "talk"
    },
    {
      "name"      : "Front End Design Conference",
      "url"       : "http://frontenddesignconference.com",
      "date"      : "July 11-12",
      "year"      : "2014",
      "location"  : "St. Petersburg, FL",
      "type"      : "talk"
    },
    {
      "name"      : "Passion Project's Public Speaking Workshop",
      "url"       : "http://passion-projects.is/",
      "date"      : "February 20",
      "year"      : "2014",
      "location"  : "San Francisco, CA",
      "type"      : "talk"
    },
    {
      "name"      : "Front Porch",
      "url"       : "http://frontporch.io",
      "date"      : "October 8",
      "year"      : "2013",
      "location"  : "Dallas, TX",
      "type"      : "talk"
    },
    {
      "name"      : "Front End Design Conference",
      "url"       : "http://frontenddesignconference.com",
      "date"      : "June 21-22",
      "year"      : "2013",
      "location"  : "St. Petersburg, FL",
      "type"      : "talk"
    },
  ]; 

    $(document).ready(function() {
      getTalks();
    });

    function getTalks(){
      // Request the JSON and process it
      $.ajax({
        type    : 'GET',
        url     : "../ajax/talks.json",
        data    : { format: 'json' },
        error: function() {
          $('#talks').html('<p>An error has occurred</p>');
        },
        success : function(data) {
          // Create an empty array to store images
          var talksArray = [];
          // Loop through the items
          for(var i=0, l=data.talksArray.length; i < l; i)
          {
            // Manipulate the image to get thumb and medium sizes
            var talk = data.talksArray[i].name;
            // Add the new element to the array
            talksArray.push(talk);
          }
          // Display the thumbnails on the page
          $('#talks').html(talksArray.join(''));

          // var $title = $('<h1>').text(data.talks[0].talk_title);
          // var $description = $('<p>').text(data.talks[0].talk_description);
          // $('#info')
          //    .append($title)
          //    .append($description);

        },
        dataType:'jsonp'
      }); 
    }
$.getJSON("../ajax/talks.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});

});