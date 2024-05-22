'use server';

export async function getUsers() {
	const res = await fetch('http://54.201.11.28:3000/api/users');
	const data = await res.json();
	return data.data;
}

export async function getImages() {
	const res = await fetch('http://34.212.20.71:3000/api/images');
	const data = await res.json();
	return data.data;
}
