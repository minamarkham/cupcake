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
	 * Add figure shortcode (requires image plugin)
	 * https://www.11ty.dev/docs/plugins/image/
	 */
	figure: function (eleventyConfig) {
		const Image = require('@11ty/eleventy-img');

		function imageShortcode(src, alt) {
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
				alt,
				loading: 'lazy',
				decoding: 'async',
			};
			// get metadata even the images are not fully generated
			const metadata = Image.statsSync(srcPlusPath, options);
			return Image.generateHTML(metadata, imageAttributes);
		}

		function figureShortcode(src, alt = '', caption = null) {
			const id = (Math.random() + 1).toString(36).substring(7);
			const image = src.split(".").pop() === 'gif' ? `<img src="${src}" alt="${alt}" />` : imageShortcode(src, alt);
			const figcaption = caption ? `<figcaption>${caption}</figcaption>` : '';

			return `<figure id="${id}anchor" class="figure">
			<a href="#${id}">${image}</a>
			<a href="#${id}anchor" class="lightbox" id="${id}"><span style="background-image: url('${src}')"></span></a>
			${figcaption}
			</figure>`;
		}

		eleventyConfig.addShortcode('figure', figureShortcode);
	},

	/**
	 * Add youtube shortcode
	 */
	youtube: function (eleventyConfig) {
		eleventyConfig.addShortcode("youtube", (videoURL, title) => {
		  const url = new URL(videoURL);
		  const id = url.searchParams.get("v");
		  return `<div class="embed"><iframe src="https://www.youtube.com/embed/${id}?controls=0" title="YouTube video player${
			title ? ` for ${title}` : ""}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
		});
	},

	/**
	 * Add vimeo shortcode
	 */
	vimeo: function (eleventyConfig) {
		eleventyConfig.addShortcode("vimeo", (videoURL) => {
			const url = new URL(videoURL);
			const id = url.pathname.replace('/', '');
			return `<div class="embed"><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
		});
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
