/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
 */

const { DateTime } = require('luxon');

module.exports = {
	// Date formatting (human readable)
	readableDate: function (eleventyConfig) {
		eleventyConfig.addFilter('readableDate', (dateObj) => {
			return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy');
		});
	},
	// Date formatting (machine readable)
	machineDate: function (eleventyConfig) {
		eleventyConfig.addFilter('machineDate', (dateObj) => {
			return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd');
		});
	},
};
