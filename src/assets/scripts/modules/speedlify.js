;(function() {
	if(!("customElements" in window) || !("fetch" in window)) {
		return;
	}

	const NAME = "speedlify-score";

	class SpeedlifyUrlStore {
		constructor() {
			this.fetches = {};
			this.responses = {};
			this.urls = {};
		}

		static normalizeUrl(speedlifyUrl, path) {
			const host = `${speedlifyUrl}${speedlifyUrl.endsWith("/") ? "" : "/"}`
			return host + (path.startsWith("/") ? path.substr(1) : path);
		}

		async fetch(speedlifyUrl, url) {
			if(this.urls[speedlifyUrl]) {
				return this.urls[speedlifyUrl][url] ? this.urls[speedlifyUrl][url].hash : false;
			}

			if(!this.fetches[speedlifyUrl]) {
				this.fetches[speedlifyUrl] = fetch(SpeedlifyUrlStore.normalizeUrl(speedlifyUrl, "api/urls.json"));
			}

			const response = await this.fetches[speedlifyUrl];

			if(!this.responses[speedlifyUrl]) {
				this.responses[speedlifyUrl] = response.json();
			}

			const json = await this.responses[speedlifyUrl];

			this.urls[speedlifyUrl] = json;

			return json[url] ? json[url].hash : false;
		}
	}

	const urlStore = new SpeedlifyUrlStore();

	customElements.define(NAME, class extends HTMLElement {
		connectedCallback() {
			this.speedlifyUrl = this.getAttribute("speedlify-url");
			this.shorthash = this.getAttribute("hash");
			this.rawData = this.getAttribute("raw-data");
			this.url = this.getAttribute("url") || window.location.href;
			this.urlStore = urlStore;

			if(!this.rawData && !this.speedlifyUrl) {
				console.log(`Missing \`speedlify-url\` attributes in <${NAME}>`);
				return;
			}

			// lol async in constructors
			this.init();
		}

		async init() {
			if(this.rawData) {
				const data = JSON.parse(this.rawData);
				this.setTimeAttributes(data);
				this.innerHTML = this.render(data);
				return;
			}

			let hash = this.shorthash;
			if(!hash) {
				// It’s much faster if you supply a `hash` attribute!
				hash = await this.urlStore.fetch(this.speedlifyUrl, this.url);
			}

			if(!hash) {
				console.error( `<${NAME}> could not find hash for URL: ${this.url}` );
				return;
			}

			const data = await this.fetchData(hash);
			this.setTimeAttributes(data);
			this.innerHTML = this.render(data);
		}

		async fetchData(hash) {
			const response = await fetch(SpeedlifyUrlStore.normalizeUrl(this.speedlifyUrl, `api/${hash}.json`));
			const json = await response.json();

			return json;
		}

		setTimeAttributes(data) {
			if(data.timestamp) {
				this.setAttribute("title", `Results from ${this.timeAgo(data.timestamp)}`);
				this.setAttribute("data-timestamp", data.timestamp)
			}
		}

		timeAgo(timestamp) {
			const days = Math.floor((new Date() - timestamp) / (1000*60*60*24));
			return `${days} day${days !== 1 ? "s" : ""} ago`;
		}

		getScoreClass(score) {
			if(score < .5) {
				return "speedlify-score speedlify-score-bad";
			}
			if(score < .9) {
				return "speedlify-score speedlify-score-ok";
			}
			return "speedlify-score speedlify-score-good";
		}

		getScoreTemplate(data) {
			const scores = [];
			scores.push(`<span title="Performance" class="${this.getScoreClass(data.lighthouse.performance)}">${parseInt(data.lighthouse.performance * 100, 10)}</span>`);
			scores.push(`<span title="Accessibility" class="${this.getScoreClass(data.lighthouse.accessibility)}">${parseInt(data.lighthouse.accessibility * 100, 10)}</span>`);
			scores.push(`<span title="Best Practices" class="${this.getScoreClass(data.lighthouse.bestPractices)}">${parseInt(data.lighthouse.bestPractices * 100, 10)}</span>`);
			scores.push(`<span title="SEO" class="${this.getScoreClass(data.lighthouse.seo)}">${parseInt(data.lighthouse.seo * 100, 10)}</span>`);
			return scores.join(" ");
		}

		render(data) {
			const content = [];
			const scoreHtml = this.getScoreTemplate(data);
			if(!this.hasAttribute("requests") && !this.hasAttribute("weight") && !this.hasAttribute("rank") || this.hasAttribute("score")) {
				content.push(scoreHtml);
			}

			const summarySplit = data.weight.summary.split(" • ");
			if(this.hasAttribute("requests")) {
				content.push(`<span class="speedlify-requests">${summarySplit[0]}</span>`);
			}
			if(this.hasAttribute("weight")) {
				content.push(`<span class="speedlify-weight">${summarySplit[1]}</span>`);
			}
			if(this.hasAttribute("rank")) {
				const rankUrl = this.getAttribute("rank-url");
				content.push(`<${rankUrl ? `a href="${rankUrl}"` : "span"} class="speedlify-rank">${data.ranks.cumulative}</${rankUrl ? "a" : "span"}>`);
			}
			if(this.hasAttribute("rank-change") && data.previousRanks) {
				const change = data.previousRanks.cumulative - data.ranks.cumulative;
				content.push(`<span class="speedlify-rank-change ${change > 0 ? "up" : (change < 0 ? "down" : "same")}">${change !== 0 ? Math.abs(change) : ""}</span>`);
			}

			return content.join("");
		}
	});
})();