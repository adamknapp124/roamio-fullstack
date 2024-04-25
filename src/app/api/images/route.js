import { NextResponse } from 'next/server';

import { S3Client, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDAPISECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDAPIKEY = process.env.CLOUDINARY_API_KEY;

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey,
	},
	region: bucketRegion,
});

export async function GET() {
	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${CLOUDNAME}/resources/image`,
		{
			headers: {
				Authorization: `Basic ${Buffer.from(
					CLOUDAPIKEY + ':' + CLOUDAPISECRET
				).toString('base64')}`,
			},
		}
	);
	const data = await res.json();
	const images = data.resources;

	return NextResponse.json({
		data: images,
	});
}

export async function POST() {}
