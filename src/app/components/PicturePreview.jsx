'use client';

import getGeolocation from '../libs/getGeolocation';
import styles from './componentStyles/picturePreview.module.css';

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
		<div className={styles.previewBox}>
			<img id='image' src={photoPreview} alt='photo' />
			<button onClick={handleClick}>Save Photo</button>
		</div>
	);
}
