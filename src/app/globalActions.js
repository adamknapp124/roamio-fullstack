'use server';

import { cookies } from 'next/headers';

export async function getUsers() {
	// Fetch users from the Database
	const res = await fetch('35.94.175.53:3000/api/users');
	// Parse the response
	const data = await res.json();
	// Return the data
	return data.data;
}

export async function getImages() {
	const res = await fetch('35.94.175.53:3000/api/images');
	const data = await res.json();
	return data.data;
}

export async function getUserById(id) {
	const res = await fetch('35.94.175.53:3000/api/users/:id');
	const data = await res.json();
	const user = data.data;
	return user;
}
