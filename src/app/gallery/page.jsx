import styles from './images.module.css';
import { getImages } from '../globalActions';

export default async function page() {
	const images = await getImages();
	console.log('Images: ', images);
	return (
		<main>
			<h1>Images</h1>
			<div className={styles.gridContainer}>
				{images &&
					images.map((image) => {
						return (
							<div key={image.url} className={styles.gridItem}>
								{/* Replace this with custom image component */}
								<img src={image.url} alt='' />
								<div>{image.created_at.split('T')[0]}</div>
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
}
