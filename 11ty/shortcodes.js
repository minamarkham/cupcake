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
	 * Add details shortcode
	 */
	details: function (eleventyConfig) {
		eleventyConfig.addShortcode("details", (key, content, isOpen = false) => {
			const open = isOpen ? 'open' : '';
			const slug = key.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
			return `<details class="accordion-item" ${open}>
				<summary><span class="accordion-title">${key}</span><span class="icon" aria-hidden="true"></span></summary>
				<div class="accordion-content">
					<span id="${slug}">${content}</span>
					<button class="button-copy" data-clipboard-target="#${slug}">
						<svg version="1.1" width="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 115.77 122.88"  xml:space="preserve"><path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/></svg>
					</button>
				</div>
			</details>`;
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
