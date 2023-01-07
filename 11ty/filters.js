/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
 */

const { DateTime } = require('luxon');

module.exports = {
	// Date formatting (human readable)
	readableDate: function (eleventyConfig) {
		eleventyConfig.addFilter('readableDate', (dateObj) => {
			return DateTime.fromJSDate(dateObj).toFormat('LLL dd yyyy');
		});
	},
	// Date formatting (machine readable)
	machineDate: function (eleventyConfig) {
		eleventyConfig.addFilter('machineDate', (dateObj) => {
			return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd');
		});
	},
	dateToISO: function (eleventyConfig) {
		eleventyConfig.addFilter('dateToISO', (date) => {
			return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
				includeOffset: false,
				suppressMilliseconds: true
			})
		});
	},
	dateToFormat: function (eleventyConfig) {
		eleventyConfig.addFilter('dateToFormat', (date, format) => {
			return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
				String(format)
			);
		});
	},
	randomLimit: function (eleventyConfig) {
		eleventyConfig.addFilter('randomLimit', (arr, limit, currPage) => {
			// Filters out current page
			const pageArr = arr.filter((page) => page.url !== currPage);

			// Randomizes remaining items
			pageArr.sort(() => { return 0.5 - Math.random(); });

			// Returns array items up to limit
			return pageArr.slice(0, limit);
		});
	}
};
