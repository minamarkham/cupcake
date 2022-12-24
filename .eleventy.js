/**
  * @file Configures preferences for Eleventy
  * @author Mina Markham <mina@mina.codes>
  * @see {@link https://www.11ty.dev/docs/config/}

  * Wait! Before you edit this file!
  * This Eleventy-based project abstracts the traditional `.eleventy.js` file to help keep things clean and tidy.
  * Consider editing the following files instead:
  *  - `./11ty/collections.js`
  *  - `./11ty/passthroughs.js`
  *  - `./11ty/plugins.js`
  *  - `./11ty/shortcodes.js`
  *  - `./11ty/watchtargets.js`
  *  - `./11ty/templateLanguages.js`
  *  - `./11ty/filters.js`
  */

// Require native Node.js modules
const chalk = require('chalk');

// Passthroughs and file copies are defined as named exports in /11ty/passthroughs.js
const passthroughs = require('./11ty/passthroughs');

// Collections are defined as named exports in /11ty/collections.js
const collections = require('./11ty/collections');

// Watch targets are defined as named exports in /11ty/watchtargets.js
const watchtargets = require('./11ty/watchtargets');

// Plugins are defined as named exports in /11ty/plugins.js
const plugins = require('./11ty/plugins');

// Shortcodes are defined as named exports in /11ty/shortcodes.js
const shortcodes = require('./11ty/shortcodes');

// Custom template languages are defined as named exports in /11ty/templateLanguages.js
const templateLanguages = require('./11ty/templateLanguages');

// Filters are defined as named exports in /11ty/filters.js
const filters = require('./11ty/filters');

// Transforms are defined as named exports in /11ty/transforms.js
const transforms = require('./11ty/transforms');

// A useful way to reference the context we are runing eleventy in
let env = process.env.ELEVENTY_ENV;

// Template language for the site: https://www.11ty.dev/docs/languages/nunjucks/
const TEMPLATE_ENGINE = 'njk';

/**
 * 11ty’s configuration module
 * @module .eleventy
 * @param {Object} eleventyConfig 11ty’s Config API
 * @return {Object} 11ty’s Config object optional
 * @see {@link https://www.11ty.dev/docs/config/ Configuring 11ty}
 */

module.exports = function (eleventyConfig) {
	// Start pretty console output
	console.group('\n', '   🪐');
	console.log(chalk.white('  |'));

	// Echo the registered collections in the terminal
	// Create collections from /11ty/collections.js
	console.group(
		chalk.white('  ├── ') +
			chalk.yellow('📚 Collections ') +
			chalk.gray('(/11ty/collections.js)')
	);

	Object.keys(collections).forEach((collectionName, index) => {
		let len = Object.keys(collections).length - 1;
		let pre = index === len ? '└── ' : '├── ';
		console.log(chalk.white('│       ' + pre) + chalk.green(collectionName));

		collections[collectionName](eleventyConfig);
	});

	console.groupEnd();

	// Echo the registered plugins in the terminal
	// Add Eleventy plugins from /11ty/plugins.js
	console.group(
		chalk.white('  ├── ') + chalk.yellow('🔌 Plugins ') + chalk.gray('(/11ty/plugins.js)')
	);

	Object.keys(plugins).forEach((pluginName, index) => {
		let len = Object.keys(plugins).length - 1;
		let pre = index == len ? '└── ' : '├── ';
		console.log(chalk.white('│       ' + pre) + chalk.green(pluginName));

		plugins[pluginName](eleventyConfig);
	});

	console.groupEnd();

	// Echo the registered filters in the terminal
	// Add Eleventy filters from /11ty/filters.js
	console.group(
		chalk.white('  ├── ') + chalk.yellow('🔀 Filters ') + chalk.gray('(/11ty/filters.js)')
	);

	Object.keys(filters).forEach((filterName, index) => {
		let len = Object.keys(filters).length - 1;
		let pre = index == len ? '└── ' : '├── ';
		console.log(chalk.white('│       ' + pre) + chalk.green(filterName));

		filters[filterName](eleventyConfig);
	});

	console.groupEnd();

	// Echo the registered shortcodes in the terminal
	// Add Eleventy shortcodes from /11ty/shortcodes.js
	console.group(
		chalk.white('  ├── ') + chalk.yellow('⏩ Shortcodes ') + chalk.gray('(/11ty/shortcodes.js)')
	);

	Object.keys(shortcodes).forEach((shortcodeName, index) => {
		let len = Object.keys(shortcodes).length - 1;
		let pre = index == len ? '└── ' : '├── ';
		console.log(chalk.white('│       ' + pre) + chalk.green(shortcodeName));

		shortcodes[shortcodeName](eleventyConfig);
	});

	console.groupEnd();

	// Echo the registered shortcodes in the terminal
	// Add Eleventy passthroughs from /11ty/passthroughs.js
	console.group(
		chalk.white('  ├── ') +
			chalk.yellow('📋 Passthroughs ') +
			chalk.gray('(/11ty/passthroughs.js)')
	);

	Object.keys(passthroughs).forEach((passthroughName, index) => {
		let len = Object.keys(passthroughs).length - 1;
		let pre = index == len ? '└── ' : '├── ';
		console.log(chalk.white('│       ' + pre) + chalk.green(passthroughName));

		eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]());
	});

	console.groupEnd();

	// Echo the registered shortcodes in the terminal
	// Add template languages from /11ty/templateLanguages.js
	console.group(
		chalk.white('  ├── ') +
			chalk.yellow('📋 Template Languages ') +
			chalk.gray('(/11ty/templateLanguages.js)')
	);

	Object.keys(templateLanguages).forEach((templateLanguageName, index) => {
		let len = Object.keys(templateLanguages).length - 1;
		let pre = index == len ? '└── ' : '├── ';
		console.log(chalk.white('│       ' + pre) + chalk.green(templateLanguageName));

		eleventyConfig.addTemplateFormats(templateLanguageName);
		eleventyConfig.addExtension(
			templateLanguageName,
			templateLanguages[templateLanguageName]()
		);
	});

	console.groupEnd();

	// Echo the registered shortcodes in the terminal
	// Add Eleventy transforms from /11ty/transforms.js
	console.group(
		chalk.white('  ├── ') + chalk.yellow('📋 Transforms ') + chalk.gray('(/11ty/transforms.js)')
	);

	Object.keys(transforms).forEach((transformName, index) => {
		let len = Object.keys(transforms).length - 1;
		let pre = index == len ? '└── ' : '├── ';
		console.log(chalk.white('│       ' + pre) + chalk.green(transformName));

		eleventyConfig.addTransform(transforms[transformName]());
	});

	console.groupEnd();

	// Echo the registered watchtargets in the terminal
	// Add watchtargets from /11ty/watchtargets.js
	console.group(
		chalk.white('  └── ') + chalk.yellow('👀 Watch ') + chalk.gray('(/11ty/watchtargets.js)')
	);

	Object.keys(watchtargets).forEach((watchtargetName, index) => {
		let len = Object.keys(watchtargets).length - 1;
		let pre = index === len ? '└── ' : '├── ';
		console.log(chalk.white('        ' + pre) + chalk.green(watchtargetName));

		eleventyConfig.addWatchTarget(watchtargets[watchtargetName]());
	});

	console.groupEnd();

	// End pretty console output
	console.log('\n');
	console.groupEnd();

	// Configure dev server
	// https://www.11ty.dev/docs/watch-serve/#eleventy-dev-server
	eleventyConfig.setServerOptions({
		// Default values are shown:

		// Opt-out of the live reload snippet
		enabled: true,

		// Opt-out of DOM diffing updates and use page reloads
		domdiff: true,

		// The starting port number to attempt to use
		port: 8080,

		// number of times to increment the port if in use
		portReassignmentRetryCount: 10,

		// Show local network IP addresses for device testing
		showAllHosts: false,

		// Use a local key/certificate to opt-in to local HTTP/2 with https
		https: {
			// key: "./localhost.key",
			// cert: "./localhost.cert",
		},

		// Change the name of the special folder name used for injected scripts
		folder: '.11ty',

		// Show the server version number on the command line
		showVersion: false,

		// Change the default file encoding for reading/serving files
		encoding: 'utf-8',
	});

	// Enable quiet mode
	// https://www.11ty.dev/docs/config/#enable-quiet-mode-to-reduce-console-noise
	eleventyConfig.setQuietMode(true);

	// Return the config to Eleventy
	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ['md', TEMPLATE_ENGINE],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: TEMPLATE_ENGINE,

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: TEMPLATE_ENGINE,

		// -----------------------------------------------------------------
		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Don’t worry about leading and trailing slashes, we normalize these.

		// If you don’t have a subdirectory, use "" or "/" (they do the same thing)
		// This is only used for link URLs (it does not affect your file structure)
		// Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

		// You can also pass this in on the command line using `--pathprefix`

		// Optional (default is shown)
		pathPrefix: '/',
		// -----------------------------------------------------------------

		dir: {
			input: 'src',
			output: 'www',
			includes: 'views',
			layouts: 'views/layouts',
			data: 'data',
		},
	};
};
