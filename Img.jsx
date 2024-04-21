import React, { useEffect } from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import axios from 'axios';

const Img = ({ pid }) => {
	const cld = new Cloudinary({ cloud: { cloudName: 'roamio' } });
	const myImage = cld.image(pid);
	myImage.resize(thumbnail().width(200).height(200).gravity(focusOn(face())));

	const handleDelete = (e) => {
		e.preventDefault();

		try {
			const result = axios.post('http://localhost:4000/delete-image', {
				image: pid,
			});
			console.log(pid);
		} catch (err) {
			console.log('Error: ', err);
		}
	};

	return (
		<form onSubmit={handleDelete}>
			<AdvancedImage cldImg={myImage} />
			<button>Delete</button>
		</form>
	);
};

// Stores the photos taken with webcams to cloudinary
const storePhoto = async () => {
	const photo = uploadedImage;
	const response = await axios.post(
		'http://localhost:2323/uploadToCloudinary',
		{
			photo: photo,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	getPublicIds();
	console.log(response.data);
};

// Upload new images from other sources
app.post('/', async (req, res) => {
	console.log('request received');
	// destructure the properties from the req object
	const { image } = req.body;
	try {
		const uploadedImage = await cloudinary.uploader.upload(
			image,
			{
				upload_preset: 'unsigned_upload',
				allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
			},
			function (error, result) {
				if (error) {
					console.log('Error: ', error);
					res.status(500).json({ error: 'Failed to upload image' });
					return;
				}

				console.log(result);
				res.status(200).json(result);
			}
		);
	} catch (error) {
		return;
	}
});

export default Img;
