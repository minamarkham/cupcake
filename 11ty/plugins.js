/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
 */

module.exports = {
	/**
	 * Metagen plugin
	 * https://github.com/tannerdolby/eleventy-plugin-metagen
	 */
	metagen: function (eleventyConfig) {
		// Require dependencies
		const plugin = require('eleventy-plugin-metagen');

		// Add plugin to eleventyConfig
		eleventyConfig.addPlugin(plugin);
	},

	/**
	 * Rollup plugin to bundle JavaScript
	 * https://github.com/Snapstromegon/eleventy-plugin-rollup
	 */
	rollup: function (eleventyConfig) {
		const plugin = require('eleventy-plugin-rollup');
		const { terser } = require('rollup-plugin-terser');
		const { nodeResolve } = require('@rollup/plugin-node-resolve');
		const replace = require('@rollup/plugin-replace');
		const commonjs = require('@rollup/plugin-commonjs');
		const image = require('@rollup/plugin-image');

		const config = {
			shortcode: 'script',
			rollupOptions: {
				output: {
					format: 'esm',
					sourcemap: true,
					dir: 'www/assets/scripts',
				},
				plugins: [
					replace({
						preventAssignment: true,
						'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
					}),
					nodeResolve(),
					terser(),
					commonjs(),
					image(),
				],
			},
		};

		// Add the plugin to the Eleventy config
		eleventyConfig.addPlugin(plugin, config);
	},

	/**
	 * Syntax highlighting plugin
	 * https://github.com/11ty/eleventy-plugin-syntaxhighlight
	 */
	syntaxHighlight: function (eleventyConfig) {
		// Require dependencies
		const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

		const config = {
			// Change which Eleventy template formats use syntax highlighters
			templateFormats: ['*'], // default

			// Use only a subset of template types (11ty.js added in v4.0.0)
			// templateFormats: ["liquid", "njk", "md", "11ty.js"],

			// init callback lets you customize Prism
			init: function ({ Prism }) {
				Prism.languages.myCustomLanguage = '';
			},

			// Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
			preAttributes: {
				tabindex: 0,

				// Added in 4.1.0 you can use callback functions too
				'data-language': function ({ language, content, options }) {
					return language;
				},
			},
			codeAttributes: {},
		};

		// Add the plugin to the Eleventy config
		eleventyConfig.addPlugin(syntaxHighlight, config);
	},

	/**
	 * HTML base plugin
	 * https://www.11ty.dev/docs/plugins/html-base/
	 */
	htmlbase: function (eleventyConfig) {
		// Require dependencies
		const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

		// Add the plugin to the Eleventy config
		eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	},

	/**
	 * RSS plugin
	 * https://www.11ty.dev/docs/plugins/rss/
	 */
	rss: function (eleventyConfig) {
		// Require dependencies
		const pluginRss = require('@11ty/eleventy-plugin-rss')

		// Add the plugin to the Eleventy config
		eleventyConfig.addPlugin(pluginRss);
	},

};
