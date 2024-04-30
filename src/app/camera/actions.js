'use server';

import { getDate } from '../utils/getDate';
import { dbConnection } from '../api/db';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

// Create an S3 client
const s3 = new S3Client({
	region: process.env.AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const maxFileSize = 1024 * 1024 * 10; // 10MB
const allowedFileTypes = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/webm',
	'image/gif',
	'image/mp4',
];

// Get signed URL for uploading photos
export async function getSignedURL(type, size, checksum, location) {
	const date = await getDate();
	// Update user_id to current user id after auth implementation
	const user_id = 1;
	// Replace this with auth implementation later
	const username = cookies().get('username').value;
	const longitude = location.longitude;
	const latitude = location.latitude;
	if (!username) {
		return { failure: { message: 'Not logged in' } };
	}

	if (size > maxFileSize) {
		return { failure: { message: 'File too large' } };
	}

	if (!allowedFileTypes.includes(type)) {
		return { failure: { message: 'Invalid file type' } };
	}

	const putObjectCommand = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: generateFileName(),
		ContentType: type,
		ContentLength: size,
		Metadata: {
			user: username,
			ChecksumSHA256: checksum,
			date: date,
		},
	});

	const signedURL = await getSignedUrl(s3, putObjectCommand, {
		expiresIn: 60,
	});

	const url = signedURL.split('?')[0];

	try {
		const connection = await dbConnection();
		await connection.query(
			'INSERT INTO images (url, user, longitude, latitude, created_at, file_size, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[url, username, longitude, latitude, date, size, user_id]
		);
		await connection.end();
	} catch (error) {
		console.log(error);
	}
	return { success: { url: signedURL } };
}
