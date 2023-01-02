/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
 */

module.exports = {
	images: function () {
		const config = { 'src/assets/images': 'assets/images' };
		return config;
	},

	media: function () {
		const config = { 'src/assets/media': 'assets/media' };
		return config;
	},

	fonts: function () {
		const config = { 'src/assets/fonts': 'assets/fonts' };
		return config;
	},

	files: function () {
		const config = { 'src/assets/files': 'assets/files' };
		return config;
	},

	icons: function () {
		const config = { 'src/assets/icons': 'assets/icons' };
		return config;
	},
};
