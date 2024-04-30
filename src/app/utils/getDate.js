export async function getDate() {
	const now = new Date();
	const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000); // Adjust for local timezone offset
	const date = localDate.toISOString().slice(0, 19).replace('T', ' ');
	return date;
}
