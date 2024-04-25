'use server';

import { cookies } from 'next/headers';

export async function login({ username }) {
	console.log('login', username);
	cookies().set('username', username);
	return { message: 'ok' };
}
