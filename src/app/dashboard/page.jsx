'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Button } from '../components/Button';

async function getUsers() {
	// Fetch users from the Database
	const res = await fetch('http://localhost:3000/api/users');
	// Parse the response
	const data = await res.json();
	// Return the data
	return data.data;
}

async function handleLogout() {
	// Remove the username cookie
	cookies().set('username', '', { maxAge: 0 });
	// Revalidate the page
	revalidatePath('/dashboard');
}

export default async function page({
	buttonText,
	purpose,
	src,
	image,
	width,
	height,
	transparent,
}) {
	// Get the username from the cookie
	const username = cookies().get('username')?.value;
	// Fetch users from the Database
	const users = await getUsers();
	return (
		<>
			{username && (
				<div>
					<h1>Dashboard</h1>
					<p>Welcome {username}!</p>
				</div>
			)}
			{!username && (
				<div>
					<h1>Dashboard</h1>
					<p>Welcome Guest</p>
				</div>
			)}
		</>
	);
}
