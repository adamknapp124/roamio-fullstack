'use client';
import { useEffect, useState } from 'react';

import shutter from '../../../public/icons/circle-xxxs-svgrepo-com.svg';
import { Button } from '../components/Button';
import styles from './camera.module.css';

export default function page() {
	const [photoPreview, setPhotoPreview] = useState();
	const [file, setFile] = useState();

	const cameraOn = () => {
		const hdConstraints = {
			video: { width: 400, height: 620 },
		};

		navigator.mediaDevices
			.getUserMedia(hdConstraints)
			.then((stream) => {
				// console.log('Activating camera');
				const video = document.querySelector('video');
				video.srcObject = stream;
			})
			.catch((error) => {
				console.log('Error accessing camera:', error);
			});
	};

	const takePicture = async (e) => {
		e.preventDefault();

		const video = document.querySelector('video');
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		const dataURL = canvas.toDataURL('image/png');
		setPhotoPreview(dataURL);
		setFile(dataURL);
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
		<main>
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
						file={file}
					/>
				</div>
			</div>
		</main>
	);
}
