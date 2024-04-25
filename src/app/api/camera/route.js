import { getSignedURL } from '../../camera/actions';
import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';

// Upload new images from other sources
export async function POST(request) {
	const username = cookies().get('username');
	if (username) {
		try {
			// Get the image from the request body
			const image = await request.json();
			// Remove the data URL prefix
			const base64Data = image.replace(/^data:image\/png;base64,/, '');
			// Convert the base64 data to a buffer
			const buffer = Buffer.from(base64Data, 'base64');
			// Upload the image to a cloud storage service
			const signedURLResult = await getSignedURL();
			if (signedURLResult.failure) {
				console.log('Failed to get signed URL');
				return;
			}
			const url = signedURLResult.success.url;

			await fetch(url, {
				method: 'PUT',
				body: buffer,
				headers: {
					'Content-Type': 'image/png',
				},
				body: buffer,
			});

			return NextResponse.json({ status: 200 });
		} catch (error) {
			console.error('Error uploading image:', error);
			return NextResponse.json(
				{ error: 'Failed to upload image' },
				{ status: 500 }
			);
		}
	}
}
