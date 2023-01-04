export default function date() {
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();
	const date = '' + month + '.' + day + '.' + year + '';
	return date;
};
