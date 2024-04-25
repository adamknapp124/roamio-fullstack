'use server';

import { cookies } from 'next/headers';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
	region: process.env.AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

export async function getSignedURL() {
	const username = cookies().get('username');

	if (!username) {
		return { failure: { message: 'Not logged in' } };
	}
	const putObjectCommand = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: 'test-file',
	});

	const signedURL = await getSignedUrl(s3, putObjectCommand, {
		expiresIn: 60,
	});
	return { success: { url: signedURL } };
}
