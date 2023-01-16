const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	const url = "https://speedlify.mina.codes/api/urls.json";
	const json = await CacheAsset(url, {
		duration: "1w",
		type: "json",
	});

	return json;
};