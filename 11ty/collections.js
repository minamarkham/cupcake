/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
 */

module.exports = {
	pages: function (eleventyConfig) {
		eleventyConfig.addCollection('pages', function (collectionApi) {
			return collectionApi.getFilteredByGlob('src/content/pages/*.md');
		});
	},

	posts: function (eleventyConfig) {
		eleventyConfig.addCollection('posts', function (collectionApi) {
			return collectionApi.getFilteredByGlob('src/content/posts/**/*.md');
		});
	},

	projects: function (eleventyConfig) {
		eleventyConfig.addCollection('projects', function (collectionApi) {
			const projects = collectionApi.getFilteredByGlob('src/content/projects/*.njk');
			return projects.sort((a, b) => Number(a.data.order) > Number(b.data.order) ? 1 : -1);
		});
	},

	pastEvents: function (eleventyConfig) {
		const events = require("../src/data/events.js")
		eleventyConfig.addCollection('pastEvents', function () {
			const filtered = events.filter(p => {
				if (Date.now() < p.datetime.getTime()) return false;
				return true;
			});

			return filtered.sort((a, b) => Number(a.datetime) < Number(b.datetime) ? 1 : -1);
		});
	},

	upcomingEvents: function (eleventyConfig) {
		const events = require("../src/data/events.js")
		eleventyConfig.addCollection('upcomingEvents', function () {
			return events.filter(p => {
				if (Date.now() > p.datetime.getTime()) return false;
				return true;
			});
		});
	},

	talks: function (eleventyConfig) {
		eleventyConfig.addCollection('talks', function (collectionApi) {
			return collectionApi.getFilteredByGlob('src/content/talks/*.md');
		});
	},

};
