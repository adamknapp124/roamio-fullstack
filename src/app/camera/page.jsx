'use client';
import { useEffect, useState } from 'react';

import shutter from '../../../public/icons/diaphragm.png';
import PhotoPreview from '../components/PicturePreview';
import getGeolocation from '../libs/getGeolocation';
import styles from './camera.module.css';
import Image from 'next/image';
import LoadingState from '../components/LoadingState';

export default function page() {
	const [photoPreview, setPhotoPreview] = useState();
	const [file, setFile] = useState();
	const [cameraStarted, setCameraStarted] = useState(false);

	const cameraOn = () => {
		const hdConstraints = {
			video: { width: 768, height: 1024 },
		};

		navigator.mediaDevices
			.getUserMedia(hdConstraints)
			.then((stream) => {
				const video = document.querySelector('video');
				video.srcObject = stream;
				setCameraStarted(true);
			})
			.catch((error) => {
				console.log('Error accessing camera:', error);
			});
	};

	useEffect(() => {
		cameraOn();
	}, [file]);

	const handleClick = async (e) => {
		const location = await getGeolocation();
		const video = document.querySelector('video');
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		const dataURL = canvas.toDataURL('image/png');
		setPhotoPreview(dataURL);
		setFile(dataURL);

		try {
			const response = await fetch('/api/camera', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ file: dataURL, location }),
			});

			if (response.ok) {
				console.log('Image uploaded successfully!');
			} else {
				console.error('Failed to upload image.');
			}
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('Failed to upload image:', error);
		}
	};

	return (
		<main className={styles.container}>
			<div className={styles.cameraContainer}>
				<h1>Camera Feed</h1>
				<video autoPlay className={styles.cameraFeed} />

				<div className={styles.photoContainer}>
					<div className={styles.photo}>
						<PhotoPreview photoPreview={photoPreview} />
					</div>
					<div className={styles.photo}></div>
				</div>
			</div>
			{cameraStarted ? (
				<div className={styles.buttonContainer}>
					<button className={styles.button}>Save all</button>
					<button className={styles.button}>Delete all</button>
				</div>
			) : (
				<LoadingState />
			)}
			<div className={styles.shutterContainer}>
				<button onClick={handleClick} className={styles.shutter}>
					<Image src={shutter} alt='shutter' width={50} height={50} />
				</button>
			</div>
		</main>
	);
}
