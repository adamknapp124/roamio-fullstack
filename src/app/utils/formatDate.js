export async function formatDate(date) {
	// console.log(date);
	const dateToFormat = date;
	const newDate = new Date(dateToFormat);

	// change timezone to users timezone
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'PST',
	};
	const formattedDate = newDate.toLocaleString('en-US', options);
	return formattedDate;
}
