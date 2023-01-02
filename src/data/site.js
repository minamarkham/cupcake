const env = {
	development: {
		url: 'http://localhost:8080',
	},
	production: {
		url: 'https://mina.codes',
	},
};

module.exports = {
	title: "Mina Markham. Engineer. Designer. Speaker.",
	description: "",
	url: "https://mina.codes", // Don't end with a slash /
	env: process.env.ELEVENTY_ENV,
	branch: process.env.BRANCH,
	siteUrl: process.env.URL,
	repo: "https://github.com/minamarkham/cupcake",
	author: {
		name: "Mina Markham",
		email: "mina@mina.codes",
		github: "https://github.com/minamarkham",
		twitter: "@minamarkham",
	},
	cover: "",
	faviconPath: "/assets/icons/favicon.png",
	googleverification: "",
	keywords: [],
	lang: "en",
	locale: "en_us",
	paginate: 6,
	...env[process.env.ELEVENTY_ENV],
};