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
			return collectionApi.getFilteredByGlob('src/content/posts/*.md');
		});
	},
};
