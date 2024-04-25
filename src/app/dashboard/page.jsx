'use server';

import { cookies } from 'next/headers';

async function getUsers() {
	const res = await fetch('http://localhost:3000/api/users');
	const data = await res.json();
	return data.data;
}

export default async function page() {
	const username = cookies().get('username')?.value;
	// Fetch users from the Database
	// Make separate route for getting current user based on user_id
	const users = await getUsers();

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {username}!</p>
		</div>
	);
}
