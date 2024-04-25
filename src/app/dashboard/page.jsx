'use server';

import { cookies } from 'next/headers';

export default async function page() {
	const username = cookies().get('username')?.value;

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {username}!</p>
		</div>
	);
}
