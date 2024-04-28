'use client';

import getGeolocation from '../libs/getGeolocation';

export default function PicturePreview({ photoPreview }) {
	async function handleClick() {
		try {
			const location = await getGeolocation();
			const requestBody = { photoPreview, location };
			const res = await fetch('http://localhost:3000/api/camera', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if (res.ok) {
				const data = await res.json();
				return data;
			}
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return (
		<>
			<img id='image' src={photoPreview} alt='photo' />
			<input type='file' filename={photoPreview} />
			<button onClick={handleClick}>Save Photo</button>
		</>
	);
}
