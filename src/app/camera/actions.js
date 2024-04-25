'use server';

import { cookies } from 'next/headers';

export async function getSignedURL() {
	const username = cookies().get('username')?.value;

	if (username) {
		return { failure: 'not authenticated' };
	}
	return { success: { url: '' } };
}
