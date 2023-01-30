// Service Workers
if ('serviceWorker' in navigator) {
	const currentPath = window.location.pathname;
	const cacheButton = document.querySelector('.offline-btn');
	const cacheIcon = document.querySelector('.cache-icon');
	const cacheText = document.querySelector('.button-text');
	const typeFace = 'https://fonts.gstatic.com/s/alegreyasanssc/v3/AjAmkoP1y0Vaad0UPPR46zqXxEMZsh1tOw6O6jsjRmU.woff2';
	const imageArray = document.querySelectorAll('img');

	const audioTrack = function() {
		if(document.querySelector('audio') !== null) {
			return (document.querySelector('audio source').src);
		} else {
			return ("/")
		}
	};

	// Event listener
	if (cacheButton) {
		cacheButton.addEventListener('click', function(e) {
			e.preventDefault();
			// Build an array of the page-specific resources.
			const pageResources = [currentPath, audioTrack(), typeFace];
			for (let i = 0; i < imageArray.length; i++) {
				pageResources.push(imageArray[i].src);
			}

			// Open the unique cache for this URL.
			caches.open('offline-' + currentPath).then(function(cache) {
				const updateCache = cache.addAll(pageResources);

				// Update UI to indicate success.
				updateCache.then(function() {
					cacheIcon.innerHTML = "☺";
					cacheText.innerHTML = 'Saved for offline';
					setTimeout(function() {
						cacheIcon.innerHTML = "⬇";
						cacheText.innerHTML = "Save for offline";
					}, 500)
				});

				// Catch any errors and report.
				updateCache.catch(function (_error) {
					cacheIcon.innerHTML = "☹";
					cacheText.innerHTML = 'Could not save';
				});
			});
		});
	}
}