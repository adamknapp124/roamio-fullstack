import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDAPISECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDAPIKEY = process.env.CLOUDINARY_API_KEY;
const ValidationURL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload`;

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
