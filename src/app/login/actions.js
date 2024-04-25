'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login({ username }) {
	console.log('login', username);
	cookies().set('username', username);
	redirect('/dashboard');
	return { message: 'ok' };
}

export async function logout({ username }) {
	console.log('logout', username);
	cookies().set('username', '', { maxAge: 0 });
	return { message: 'ok' };
}
