import CloudImage from '../components/CloudImage';

import styles from './images.module.css';

async function getImages() {
	const res = await fetch('http://localhost:3000/api/images');

	const data = await res.json();
	console.log(data);
	return data.data;
}

const Images = async () => {
	const images = await getImages();
	return (
		<main className={styles.container}>
			<h1>Images</h1>
			<div className={styles.pictureBox}>
				{images &&
					images.map((image) => {
						return (
							<div key={image.asset_id}>
								<CloudImage public_id={image.public_id} />
							</div>
						);
					})}
			</div>
		</main>
	);
};

export default Images;
