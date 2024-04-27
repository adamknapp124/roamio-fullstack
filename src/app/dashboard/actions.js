'use server';

import { cookies } from 'next/headers';

export async function getUsers() {
	// Fetch users from the Database
	const res = await fetch('http://localhost:3000/api/users');
	// Parse the response
	const data = await res.json();
	// Return the data
	return data.data;
}
