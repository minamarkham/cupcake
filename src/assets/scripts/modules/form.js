export function animateButton(e) {
	const button = e.target;

	// reset animation
	button.classList.remove('animate');
	button.classList.add('animate');

	setTimeout(function() {
		button.classList.remove('animate');
	}, 2000);
}

export function handleSubmit(e) {
	const myForm = e.target;
	const formData = new FormData(myForm);

	fetch("/", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams(formData).toString(),
	})
	.then(() => console.log("Form successfully submitted"), e.target.reset() )
	.catch((error) => console.log(error));
}
