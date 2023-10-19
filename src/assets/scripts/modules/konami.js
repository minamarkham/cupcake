import cheet from 'cheet.js';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

cheet('b e y o n c e', function () {
	jsConfetti.addConfetti({
		emojis: ['🐝'],
		emojiSize: 100,
		confettiNumber: 30,
	});
});

cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
	jsConfetti.addConfetti();
});
