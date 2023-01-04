/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
 */

module.exports = {
	/**
	 * Add date shortcode
	 * By Stephanie Eckles
	 * https://11ty.rocks/eleventyjs/dates/
	 */
	year: function (eleventyConfig) {
		eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
	},

	/**
	 * Add image shortcode (requires image plugin)
	 * https://www.11ty.dev/docs/plugins/image/
	 */
	image: function (eleventyConfig) {
		const Image = require('@11ty/eleventy-img');

		function imageShortcode(src, alt = '', className = '', style = '', sizes = '') {
			const options = {
				widths: [null],
				formats: [null],
				urlPath: '/assets/images/',
				outputDir: './www/assets/images/',
			};

			// Prepend the src directory
			const srcPlusPath = './src/' + src;

			// generate images, while this is async we don’t wait
			Image(srcPlusPath, options);

			const imageAttributes = {
				class: className,
				style,
				alt,
				sizes,
				loading: 'lazy',
				decoding: 'async',
			};
			// get metadata even the images are not fully generated
			const metadata = Image.statsSync(srcPlusPath, options);
			return Image.generateHTML(metadata, imageAttributes);
		}

		eleventyConfig.addNunjucksShortcode('image', imageShortcode);
	},

	/**
	 * Custom layout blocks
	 * https://github.com/11ty/eleventy/issues/853
	 */
	makeBlock: function (eleventyConfig) {
		function makeBlock(content, name) {
			if (!this.page.layoutblock) this.page.layoutblock = {};
			this.page.layoutblock[name] = content;
			return '';
		}
		eleventyConfig.addPairedShortcode('layoutblock', makeBlock);
	},

	renderBlock: function (eleventyConfig) {
		function renderBlock(name) {
			return (this.page.layoutblock || {})[name] || '';
		}
		eleventyConfig.addShortcode('renderlayoutblock', renderBlock);
	},
};
