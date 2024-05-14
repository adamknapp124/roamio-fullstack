import { getSignedURL } from '../../camera/actions';

import crypto from 'crypto';
import { NextResponse } from 'next/server';

import { getDate } from '../../utils/getDate';

// Compute the SHA-256 checksum of a file
const hashBuffer = async (file) => {
	// Read the file as an ArrayBuffer
	const newBuffer = await file.arrayBuffer();
	// Compute the SHA-256 checksum
	const hashBuffer = await crypto.subtle.digest('SHA-256', newBuffer);
	// Convert the buffer to a hexadecimal string
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
	return hashHex;
};

export async function POST(request) {
	const date = await getDate();
	try {
		// Get the image from the request body
		const photoData = await request.json();
		console.log(photoData);
		const location = photoData.location;
		const photo = photoData.file;
		// Remove the data URL prefix
		const base64Data = photo.replace(/^data:image\/png;base64,/, '');
		// Convert the base64 data to a buffer
		const buffer = Buffer.from(base64Data, 'base64');
		// Create a file from the buffer
		const file = new File([buffer], 'image.png', { type: 'image/png' });

		// Compute the SHA-256 checksum of the file
		const checksum = await hashBuffer(file);
		const signedURLResult = await getSignedURL(
			file.type,
			file.size,
			checksum,
			location,
			date
		);
		if (signedURLResult.failure !== undefined) {
			console.log('Failed to get signed URL');
			return;
		}
		const url = signedURLResult.success.url;

		await fetch(url, {
			method: 'PUT',
			body: buffer,
			headers: {
				'Content-Type': file.type,
			},
		});

		return NextResponse.json({ url }, { status: 200 });
	} catch (error) {
		console.error('Error uploading image:', error);
		return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
	}
}
