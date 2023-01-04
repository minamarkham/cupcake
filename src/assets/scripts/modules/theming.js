export default function() {
	const setDOMThemeFromStorage = () => {
		localStorage.setItem('darkMode', document.documentElement.hasAttribute('dark'));
	};

	const toggleDarkMode = () => {
		document.documentElement.toggleAttribute('dark');
		setDOMThemeFromStorage();
	};

	document.addEventListener('keypress', ({ shiftKey, key }) => {
		if (shiftKey && key && key === 'D') toggleDarkMode();
	});

	document.querySelector('.theme-toggle').addEventListener('click', () => {
		toggleDarkMode();
	});
}