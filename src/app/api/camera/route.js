import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload new images from other sources
export async function POST(request) {
	try {
		const image = await request.json();

		if (!image) {
			throw new Error('Missing or empty image data in request body');
		}

		// Upload image to Cloudinary
		const uploadedImage = await cloudinary.uploader.upload(image, {
			upload_preset: 'unsigned_upload',
			allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
		});

		console.log('Image uploaded:', uploadedImage);
		return NextResponse.json(uploadedImage, { status: 200 });
	} catch (error) {
		console.error('Error uploading image:', error);
		return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
	}

	return new Response();
}
