'use client';

import Image from 'next/image';
import shutter from '../../../public/icons/circle-xxxs-svgrepo-com.svg';

import { Button } from '../components/Button';
import styles from './camera.module.css';
import { useEffect, useState } from 'react';

const Camera = () => {
	const [photoPreview, setPhotoPreview] = useState();

	const cameraOn = () => {
		const hdConstraints = {
			video: true,
		};

		navigator.mediaDevices
			.getUserMedia(hdConstraints)
			.then((stream) => {
				console.log('Activating camera');
				const video = document.querySelector('video');
				video.srcObject = stream;
			})
			.catch((error) => {
				console.log('Error accessing camera:', error);
			});
	};

	const takePicture = (e) => {
		e.preventDefault();
		console.log('Freezing life');
		const video = document.querySelector('video');
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		const dataURL = canvas.toDataURL('image/png');
		setPhotoPreview(dataURL);
	};

	// stop both mic and camera if you need it

	// const cameraOff = () => {
	// 	console.log('Deactivating camera');
	// 	const video = document.querySelector('video');
	// 	const mediaStream = video.srcObject;
	// 	if (mediaStream) {
	// 		const tracks = mediaStream.getTracks();
	// 		tracks.forEach((track) => track.stop());
	// 		video.srcObject = null;
	// 	}
	// };

	useEffect(() => {
		cameraOn();
	});

	// CREATE LOADING STATE FOR CAMERA

	return (
		<main className={photoPreview ? styles.container : styles.modifiedContainer}>
			{photoPreview ? (
				<div className={styles.videoBox}>
					<div>Image preview</div>
					<img
						className={styles.videoContainer}
						src={photoPreview}
						alt={photoPreview}
					/>
				</div>
			) : null}
			<div className={styles.videoBox}>
				<div>Camera Feed</div>
				<video
					autoPlay
					className={
						photoPreview ? styles.videoContainer : styles.noPhoto
					}></video>
			</div>
			<div className={styles.buttonContainer}>
				<div className={styles.shutter}>
					<Button
						image={true}
						src={shutter}
						height={50}
						width={50}
						transparent={true}
						purpose={takePicture}
					/>
				</div>
			</div>
		</main>
	);
};

export default Camera;
