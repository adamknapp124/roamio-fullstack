'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

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

export async function getSignedURL(type, size, checksum) {
	// Replace this with auth implementation later
	const username = cookies().get('username').value;
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
		ChecksumSHA256: checksum,
		Metadata: {
			username,
		},
	});

	const signedURL = await getSignedUrl(s3, putObjectCommand, {
		expiresIn: 60,
	});
	return { success: { url: signedURL } };
}
