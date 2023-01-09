export function animateButton(e) {
	const button = e.target;
	button.classList.remove('animate');
	button.classList.add('animate');
}

export function handleSubmit(e) {
	const myForm = e.target;
	const formData = new FormData(myForm);

	fetch("/", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams(formData).toString(),
	});
}
