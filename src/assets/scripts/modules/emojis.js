import randomize from "../utils/randomize";

const emojis = [
	'☕️', // coffee
	'🍷', // wine
	'🍪', // cookie
	'💃', // dancer
	'💅', // nail care
	'🎉', //  tada
	'💯', //  100
	'🍕', //  pizza
];

function randomEmojis() {
	const element = document.querySelector('.emoji');
	element.innerHTML = randomize(emojis);
}

export default function() {
	setInterval(randomEmojis, 2e3);
}