/**
 * randomize()
 * Get random item from array
 *
 * @param {Array} array
 */

export default function randomize(array) {
	return array[Math.floor(Math.random() * array.length)];
}
