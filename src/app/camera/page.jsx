'use client';

import styles from './camera.module.css';

const Camera = () => {
	const cameraOn = () => {
		const hdConstraints = {
			video: {
				width: {
					exact: 1280,
				},
				height: {
					exact: 720,
				},
			},
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

	// stop both mic and camera
	function cameraOff() {
		const video = document.querySelector('video');
		const mediaStream = video.srcObject;
		if (mediaStream) {
			const tracks = mediaStream.getTracks();
			tracks.forEach((track) => track.stop());
			video.srcObject = null;
		}
	}

	return (
		<main className={styles.container}>
			<video autoPlay className={styles.videoContainer}></video>
			<div className={styles.cameraControls}>
				<button onClick={cameraOn}>Camera on</button>
				<button onClick={cameraOff}>Camera off</button>
			</div>
		</main>
	);
};

export default Camera;
