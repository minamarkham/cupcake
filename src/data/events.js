const { DateTime } = require("luxon");

module.exports = [
	{
		"name": "Source Up!",
		"url": "https://sourceup.co.za/",
		"datetime": DateTime.fromFormat('03-11-2019', 'MM-dd-yyyy').toJSDate(),
		"location": "Cape Town, South Africa",
		"onsale": {
			"url": "https://tickets.sourceup.co.za/"
		},
		"talk": true
	},
	{
		"name": "An Event Apart: San Francisco",
		"url": "https://aneventapart.com/event/san-francisco-2018",
		"datetime": DateTime.fromFormat('12-10-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "San Francisco, California",
		"onsale": {
			"url": "https://store.aneventapart.com/register/2018/san-francisco"
		},
		"talk": true
	},
	{
		"name": "Coldfront",
		"url": "https://2018.coldfront.co/",
		"datetime": DateTime.fromFormat('11-13-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "Copenhagen, Denmark",
		"onsale": {
			"url": "https://ti.to/coldfront/coldfront-2018"
		},
		"talk": true
	},
	{
		"name": "Girl Develop It: Oakland Launch Party",
		"url": "https://www.girldevelopit.com/chapters/oakland",
		"datetime": DateTime.fromFormat('10-03-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "Oakland, California",
		"onsale": {
			"url": "https://www.meetup.com/Girl-Develop-It-Oakland/events/254469886/"
		},
		"meetup": true,
		"talk": true
	},
	{
		"name": "Loupe",
		"url": "https://framer.com/loupe",
		"datetime": DateTime.fromFormat('09-20-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "Amsterdam, Netherlands",
		"talk": true
	},
	{
		"name": "Made in the Middle",
		"url": "https://madeinthemiddle.com/conference/",
		"datetime": DateTime.fromFormat('09-15-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "Kansas City, Missouri",
		"talk": true
	},
	{
		"name": "An Event Apart: Chicago",
		"url": "https://aneventapart.com/event/chicago-2018",
		"datetime": DateTime.fromFormat('03-11-2019', 'MM-dd-yyyy').toJSDate(),
		"where": "Chicago, Illinois",
		"talk": true
	},
	{
		"name": "Concatenate Conf",
		"url": "http://www.concatenate.io",
		"datetime": DateTime.fromFormat('08-10-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "Lagos, Nigeria",
		"online": true,
		"talk": true
	},
	{
		"name": "Write/Speak/Code 2018",
		"url": "https://www.writespeakcode.com/2018/",
		"datetime": DateTime.fromFormat('08-01-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "New York, New York",
		"talk": true,
		"keynote": true
	},
	{
		"name": "The Mixin SF",
		"url": "https://www.eventbrite.com/e/the-mixin-sf-sass-frontend-meet-up-registration-47574946947#",
		"datetime": DateTime.fromFormat('08-11-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "San Francisco, California",
		"meetup": true,
		"talk": true
	},
	{
		"name": "We Have Standards: A Design Systems Panel @ SF Design Week",
		"url": "https://2018.sfdesignweek.org/events/evolution-at-scale/",
		"datetime": DateTime.fromFormat('06-14-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "San Francisco, California",
		"panel": true
	},
	{
		"name": "Front-End Design Conference",
		"url": "https://frontenddesignconference.com/",
		"datetime": DateTime.fromFormat('04-25-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "St. Petersburg, Florida",
		"talk": true
	},
	{
		"name": "Smashing Conf",
		"url": "https://smashingconf.com/sf-2018/",
		"datetime": DateTime.fromFormat('04-17-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "San Francisco, California",
		"talk": true
	},
	{
		"name": "#perfmatters Conf",
		"url": "https://perfmattersconf.com/",
		"datetime": DateTime.fromFormat('03-17-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "Redwood City, California",
		"panel": true
	},
	{
		"name": "CSUN Assistive Technology Conference",
		"url": "http://www.csun.edu/cod/conference/2018/sessions/index.php/",
		"datetime": DateTime.fromFormat('03-20-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "San Jose, California",
		"talk": true,
		"misc": "with Kimberly Muñoz"
	},
	{
		"name": "The Lead Dev Austin",
		"url": "https://austin2018.theleaddeveloper.com/spring-2018-videos",
		"datetime": DateTime.fromFormat('03-02-2018', 'MM-dd-yyyy').toJSDate(),
		"where": "Austin, Texas",
		"video": "https://www.youtube.com/watch?v=fWivXkQpO2Q",
		"talk": true
	},
	{
		"name": "Clarity 2017",
		"url": "https://www.clarityconf.com/2017",
		"datetime": DateTime.fromFormat('11-28-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "San Francisco, California",
		"video": "https://www.youtube.com/watch?v=YBLHB8LWhqg",
		"talk": true
	},
	{
		"name": "beyond tellayard 2017",
		"url": "https://beyondtellerrand.com/events/berlin-2017/speakers",
		"datetime": DateTime.fromFormat('11-06-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Berlin, Germany",
		"video": "https://vimeo.com/241705921",
		"talk": true
	},
	{
		"name": "Girl Develop It Leadership Summit",
		"url": "https://www.girldevelopit.com/summit",
		"datetime": DateTime.fromFormat('10-21-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Denver, Colorado",
		"talk": true
	},
	{
		"name": "Adobe Max 2017",
		"url": "https://2017.max.adobe.com/",
		"datetime": DateTime.fromFormat('10-18-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Las Vegas, Nevada",
		"talk": true
	},
	{
		"name": "CSS Dev Conference",
		"url": "https://www.cssdevconf.com/",
		"datetime": DateTime.fromFormat('10-11-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "New Orleans, LA",
		"keynote": true
	},
	{
		"name": "IBM FEDucation",
		"url": "https://www.ibm.com/design/",
		"datetime": DateTime.fromFormat('10-04-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Austin, Texas",
		"online": true
	},
	{
		"name": "Write/Speak/Code 2017",
		"url": "https://2017.writespeakcode.com/index.html",
		"datetime": DateTime.fromFormat('08-23-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Portland, Oregon",
		"keynote": true
	},
	{
		"name": "Kitbash: Netflix Enterprise Design Showcase",
		"url": "https://www.meetup.com/Kitbash-Enterprise-Design-Showcase/",
		"datetime": DateTime.fromFormat('06-28-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "San Francisco, California",
		"talk": true
	},
	{
		"name": "Salesforce UX Mentorship Night @ SF Design Week",
		"url": "",
		"datetime": DateTime.fromFormat('06-19-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "San Francisco, California",
		"talk": true
	},
	{
		"name": "Respond Melbourne",
		"url": "http://www.webdirections.com/respond",
		"datetime": DateTime.fromFormat('05-08-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Melbourne, Australia",
		"talk": true
	},
	{
		"name": "Respond Sydney",
		"url": "http://www.webdirections.com/respond",
		"datetime": DateTime.fromFormat('05-04-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Sydney, Australia",
		"talk": true
	},
	{
		"name": "Generate New York",
		"url": "https://www.generateconf.com/new-york",
		"datetime": DateTime.fromFormat('04-27-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "New York, NY",
		"video": "https://www.youtube.com/watch?v=Mjg8qQM_R5c&t=1s",
		"talk": true
	},
	{
		"name": "FITC Toronto",
		"url": "http://fitc.ca/event/to17/",
		"datetime": DateTime.fromFormat('04-23-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Toronto, Canada",
		"video": "https://www.youtube.com/watch?v=oGLzyytGOVg",
		"talk": true
	},
	{
		"name": "Render Conf",
		"url": "http://renderconf.com",
		"datetime": DateTime.fromFormat('03-30-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Oxford, England",
		"video": "https://www.youtube.com/watch?v=dwMhn2OKHkk",
		"talk": true
	},
	{
		"name": "Google Women Techmakers: International Women's Day",
		"url": "http://sites.google.com/site/iwd2017nyc/",
		"datetime": DateTime.fromFormat('03-04-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "New York, NY",
		"panel": true
	},
	{
		"name": "DevTO's Annual International Women's Day Talks",
		"url": "http://iwd.devto.ca/",
		"datetime": DateTime.fromFormat('03-06-2017', 'MM-dd-yyyy').toJSDate(),
		"location": "Toronto, Canada",
		"talk": true
	},
	{
		"name": "Future of Web Design, NYC",
		"url": "https://futureofwebdesign.com/nyc-2015/",
		"datetime": DateTime.fromFormat('11-02-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "New York, NY",
		"talk": true,
		"title": "SMACSS Your Sass Up",
		"slides": "https://speakerdeck.com/minamarkham/smacss-your-sass-up"
	},
	{
		"name": "CSS Dev Conf",
		"url": "http://2015.cssdevconf.com",
		"datetime": DateTime.fromFormat('10-26-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "Long Beach, CA",
		"talk": true,
		"title": "SMACSS Your Sass Up",
		"video": "https://www.youtube.com/watch?v=bTDXdtjU078",
		"slides": "https://speakerdeck.com/minamarkham/smacss-your-sass-up"
	},
	{
		"name": "Fusion Day",
		"url": "https://ti.to/antifusion/fusion-day",
		"datetime": DateTime.fromFormat('09-03-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "Charlotte, NC",
		"talk": true,
		"title": "Finding Your Tribe",
	},
	{
		"name": "Collision Conference",
		"url": "http://collisionconf.com/",
		"datetime": DateTime.fromFormat('05-05-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "Las Vegas, NV",
		"fireside": true
	},
	{
		"name": "O'Reilly Fluent Conference",
		"url": "http://fluentconf.com/",
		"datetime": DateTime.fromFormat('04-20-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "San Francisco, CA",
		"talk": true,
		"title": "SMACSS Your Sass Up",
		"slides": "https://speakerdeck.com/minamarkham/smacss-your-sass-up"
	},
	{
		"name": "Converge SE",
		"url": "http://convergese.com/",
		"datetime": DateTime.fromFormat('04-15-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "Columbia, SC",
		"talk": true,
		"title": "SMACSS Your Sass Up",
		"slides": "https://speakerdeck.com/minamarkham/smacss-your-sass-up"
	},
	{
		"name": "Camp Sass",
		"url": "http://campsass.com/",
		"datetime": DateTime.fromFormat('04-04-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "Atlanta, GA",
		"talk": true,
		"title": "Finding Your Tribe",
	},
	{
		"name": "Squares Conference",
		"url": "http://squaresconference.com/",
		"datetime": DateTime.fromFormat('03-25-2015', 'MM-dd-yyyy').toJSDate(),
		"location": "Grapevine, TX",
		"workshop": true
	},

	{
		"name": "Sass Summit",
		"url": "http://environmentsforhumans.com/2014/sass-summit/",
		"datetime": DateTime.fromFormat('11-06-2014', 'MM-dd-yyyy').toJSDate(),
		"location": "Online",
		"talk": true
	},
	{
		"name": "Front Porch",
		"url": "http://frontporch.io",
		"datetime": DateTime.fromFormat('10-07-2014', 'MM-dd-yyyy').toJSDate(),
		"location": "Dallas, TX",
		"talk": true,
		"title": "SMACSS Your Sass Up",
		"slides": "https://speakerdeck.com/minamarkham/smacss-your-sass-up",
		"video": "https://www.youtube.com/watch?v=seMP-6CkmZ4"
	},
	{
		"name": "That Conference",
		"url": "http://thatconference.com/",
		"datetime": DateTime.fromFormat('08-11-2014', 'MM-dd-yyyy').toJSDate(),
		"location": "Wisconsin Dells, WI",
		"talk": true
	},
	{
		"name": "Distill",
		"url": "http://distill.engineyard.com/",
		"datetime": DateTime.fromFormat('08-07-2014', 'MM-dd-yyyy').toJSDate(),
		"location": "San Francisco, CA",
		"talk": true,
		"slides": "https://speakerdeck.com/minamarkham/sweet-and-sassy-responsive-design-distill-2014",
		"video": "http://vimeo.com/105594351"
	},
	{
		"name": "Midwest.io",
		"url": "http://midwest.io/",
		"datetime": DateTime.fromFormat('07-14-2014', 'MM-dd-yyyy').toJSDate(),
		"location": "Kansas City, MO",
		"talk": true,
		"title": "SMACSS Your Sass Up",
		"slides": "https://speakerdeck.com/minamarkham/smacss-your-sass-up",
		"video": "https://www.youtube.com/watch?v=SkGVKyaxSuY"
	},
	{
		"name": "Front End Design Conference",
		"url": "http://frontenddesignconference.com",
		"datetime": DateTime.fromFormat('07-11-2014', 'MM-dd-yyyy').toJSDate(),
		"location": "St. Petersburg, FL",
		"talk": true,
		"title": "SMACSS Your Sass Up",
		"slides": "https://speakerdeck.com/minamarkham/smacss-your-sass-up"
	},
	{
		"name": "Passion Project's Public Speaking Workshop",
		"url": "http://passion-projects.is/",
		"datetime": DateTime.fromFormat('02-20-2014', 'MM-dd-yyyy').toJSDate(),
		"location": "San Francisco, CA",
		"talk": true,
		"slides": "https://speakerdeck.com/minamarkham/the-art-of-proposing"
	},
	{
		"name": "Front Porch",
		"url": "http://frontporch.io",
		"datetime": DateTime.fromFormat('10-08-2013', 'MM-dd-yyyy').toJSDate(),
		"location": "Dallas, TX",
		"talk": true
	},
	{
		"name": "Front End Design Conference",
		"url": "http://frontenddesignconference.com",
		"datetime": DateTime.fromFormat('06-21-2013', 'MM-dd-yyyy').toJSDate(),
		"location": "St. Petersburg, FL",
		"talk": true
	}
];