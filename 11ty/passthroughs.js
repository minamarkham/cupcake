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

	meta: function () {
		const config = {
			"src/assets/images/meta/apple-touch-icon.png" : "apple-touch-icon.png",
			"src/assets/images/meta/favicon.ico" : "favicon.ico",
			"src/assets/images/meta/favicon.png" : "favicon.png",
			"src/assets/images/meta/icon.svg" : "icon.svg",
			"src/assets/images/meta/social-share.jpg" : "social-share.jpg",
		}
		return config;
	},

	admin: function () {
		const config = { 'src/admin': 'admin' };
		return config;
	},
};
