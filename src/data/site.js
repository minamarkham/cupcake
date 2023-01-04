const env = {
	development: {
		url: 'http://localhost:8080',
	},
	production: {
		url: 'https://mina.codes',
	},
};

module.exports = {
	title: "Mina Markham — engineer. designer. writer. speaker.",
	description: "An engineer, designer, writer, and speaker who specializes in creating exceptional digital experiences.",
	url: "https://mina.codes", // Don't end with a slash /
	env: process.env.ELEVENTY_ENV,
	branch: process.env.BRANCH,
	siteUrl: process.env.URL,
	repo: "https://github.com/minamarkham/cupcake",
	author: {
		name: "Mina Markham",
		email: "mina@mina.codes",
		github: "https://github.com/minamarkham",
		handle: "minamarkham",
	},
	image: {
		src: "/social-card.jpg",
		alt: "An engineer, designer, writer, and speaker.",
	},
	themeColor: "#ff3377",
	backgroundColor: "#ffffff",
	faviconPath: "/favicon.png",
	googleverification: "",
	keywords: [],
	lang: "en",
	locale: "en_us",
	paginate: 6,
	...env[process.env.ELEVENTY_ENV],
};