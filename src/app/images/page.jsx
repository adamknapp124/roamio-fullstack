import styles from './images.module.css';
import { getImages } from '../globalActions';
import { formatDate } from '../utils/formatDate';

export default async function page() {
	const images = await getImages();
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
								{/* Insert date on image upload */}
								<div>April 27, 2024</div>
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
