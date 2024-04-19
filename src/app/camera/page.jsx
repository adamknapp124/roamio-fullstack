'use client';

import Image from 'next/image';
import shutter from '../../../public/icons/circle-xxxs-svgrepo-com.svg';

import { Button } from '../components/Button';
import styles from './camera.module.css';
import { useEffect } from 'react';

const Camera = () => {
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
		<main className={styles.container}>
			<video autoPlay className={styles.videoContainer}></video>
			<div className={styles.buttonContainer}>
				<div className={styles.shutter}>
					<Button
						image={true}
						src={shutter}
						height={50}
						width={50}
						transparent={true}
					/>
				</div>
			</div>
		</main>
	);
};

export default Camera;
