import CloudImage from '../components/CloudImage';

async function getImages() {
	const res = await fetch('http://localhost:3000/api/images');

	const data = await res.json();
	return data.data;
}

const Images = async () => {
	const images = await getImages();
	return (
		<main>
			{images &&
				images.map((image) => {
					return (
						<CloudImage public_id={image.public_id} key={image.asset_id} />
					);
				})}
		</main>
	);
};

export default Images;
