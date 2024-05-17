'use server';

import { cookies } from 'next/headers';

export async function getUsers() {
	const res = await fetch('/api/users');
	const data = await res.json();
	return data.data;
}

export async function getImages() {
	const res = await fetch('/api/images');
	const data = await res.json();
	return data.data;
}
