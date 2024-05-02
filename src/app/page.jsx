'use server';

import { cookies } from 'next/headers';

import { getUsers } from './globalActions';

// Temporary until auth is implemented
async function handleLogout() {
	cookies().set('username', '', { maxAge: 0 });
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
	const username = cookies().get('username')?.value;

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
