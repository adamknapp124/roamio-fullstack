import { NextResponse } from 'next/server';

const CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDAPISECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDAPIKEY = process.env.CLOUDINARY_API_KEY;

export async function GET() {
	console.log('started');
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
