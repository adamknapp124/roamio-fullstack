import CloudImage from '../components/CloudImage';

import styles from './images.module.css';

async function getImages() {
	const res = await fetch('http://localhost:3000/api/images');

	const data = await res.json();
	console.log(data);
	return data.data;
}

async function formatDate(date) {
	const dateToFormat = date;
	const newDate = new Date(dateToFormat);

	// change timezone to users timezone
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'PST',
	};
	const formattedDate = newDate.toLocaleString('en-US', options);
	return formattedDate;
}

const Images = async () => {
	const images = await getImages();
	return (
		<main>
			<h1>Images</h1>
			<div className={styles.gridContainer}>
				{images &&
					images.map((image) => {
						return (
							<div key={image.asset_id} className={styles.gridItem}>
								<CloudImage public_id={image.public_id} />
								<div>{formatDate(image.created_at)}</div>
								<div className={styles.optionsBox}>
									<button>Delete</button>
									<button>Lock</button>
								</div>
							</div>
						);
					})}
			</div>
		</main>
	);
};

export default Images;
