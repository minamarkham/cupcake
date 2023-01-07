const { DateTime } = require("luxon");

module.exports = [
	{
		"url": "https://responsivewebdesign.com/podcast/mina-markham/",
		"title": "Spotlight: Mina Markham",
		"host": "Responsive Web Design Podcast",
		"date": "Jan 27 2017",
		"datetime": DateTime.fromFormat('01-27-2017', 'MM-dd-yyyy').toJSDate(),
		"time": "30 mins"
	},
	{
		"url": "http://hanselminutes.com/564/building-pantsuit-the-hillary-clinton-ui-pattern-library-with-mina-markham",
		"title": "Building Pantsuit: The Hillary Clinton UI Pattern Library with Mina Markham",
		"host": "Hanselminutes by Scott Hanselman",
		"date": "Jan 27 2017",
		"datetime": DateTime.fromFormat('11-27-2017', 'MM-dd-yyyy').toJSDate(),
		"time": "30 mins"
	},
	{
		"url": "http://revisionpath.com/mina-markham/",
		"title": "Revision Path № 118",
		"host": "with Maurice Cherry",
		"date": "December 24, 2015",
		"datetime": DateTime.fromFormat('12-24-2015', 'MM-dd-yyyy').toJSDate(),
		"time": "42 mins"
	},
	{
		"url": "http://shoptalkshow.com/episodes/189-css-dev-conf-2015-wrapup/",
		"title": "ShopTalk № 189",
		"host": "with Chris Coyier and Dave Rupert",
		"description": "I was at CSS Dev Conf when Chris and Dave asked me about the conference and work things.",
		"date": "October 30, 2015",
		"datetime": DateTime.fromFormat('10-30-2015', 'MM-dd-yyyy').toJSDate(),
		"time": "63 mins"
	},
	{
		"url": "http://shoptalkshow.com/episodes/097-mina-markham/",
		"title": "ShopTalk, № 48",
		"host": "with Chris Coyier and Dave Rupert",
		"date": "December 26, 2013",
		"datetime": DateTime.fromFormat('12-26-2013', 'MM-dd-yyyy').toJSDate(),
		"time": "63 mins"
	}
]
