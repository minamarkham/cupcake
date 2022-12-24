/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
 */

module.exports = {
	images: function () {
		let config = { 'src/assets/images': 'assets/images' };
		return config;
	},

	fonts: function () {
		let config = { 'src/assets/fonts': 'assets/fonts' };
		return config;
	},

	files: function () {
		let config = { 'src/assets/files': 'assets/files' };
		return config;
	},

	icons: function () {
		let config = { 'src/assets/icons': 'assets/icons' };
		return config;
	},
};
