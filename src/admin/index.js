import Post from './templates/post.js';
import Page from './templates/page.js';

CMS.registerPreviewStyle("../assets/styles/main.css");

CMS.registerPreviewTemplate("posts", Post);
CMS.registerPreviewTemplate("pages", Page);

CMS.registerEditorComponent({
	id:"image",
	label: "Image",
	fields:[{
		name: "url",
		label: "url",
		widget: "string"
	}],
	pattern: /{% image "(.*)" %}/,
	fromBlock: function(match){
		return{
			link: match[1]
		};
	},
	toBlock: ({url}) => `{% image "${url}" %}`,
	toPreview: ({url}) => {
		return `
			<img src="${url}" alt="" />
		`
	}
});

CMS.registerEditorComponent({
	id:"figure",
	label: "Figure",
	fields:[{
		name: "caption",
		label: "caption",
		widget: "string"
	}],
	pattern: /{% figure "(.*)" %}/,
	fromBlock: function(match){
		return{
			link: match[1]
		};
	},
	toBlock: ({content, caption}) => `{% figure "${caption}" %}`,
	toPreview: ({content, caption}) => {
		return `
			<figure>
				${content}
				<figcaption>${caption}</figcaption>
			</figure>
		`
	}
});

CMS.registerEditorComponent({
	id:"youtube",
	label: "YouTube",
	fields:[{
		name: "videoURL",
		label: "videoURL",
		widget: "string"
	}],
	pattern: /{% youtube "(.*)" %}/,
	fromBlock: function(match){
		return{
			link: match[1]
		};
	},
	toBlock: ({videoURL}) => `{% youtube "${videoURL}" %}`,
	toPreview: ({videoURL}) => {
		const url = new URL(videoURL);
		const id = url.searchParams.get("v");
		return `
			<div class="embed"><iframe src="https://www.youtube.com/embed/${id}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
		`
	}
});

CMS.registerEditorComponent({
	id:"vimeo",
	label: "Vimeo",
	fields:[{
		name: "videoURL",
		label: "videoURL",
		widget: "string"
	}],
	pattern: /{% vimeo "(.*)" %}/,
	fromBlock: function(match){
		return{
			link: match[1]
		};
	},
	toBlock: ({videoURL}) => `{% vimeo "${videoURL}" %}`,
	toPreview: ({videoURL}) => {
		const url = new URL(videoURL);
		const id = url.pathname.replace('/', '');
		return `
			<div class="embed"><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>
		`
	}
});