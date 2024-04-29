import GoogleMaps from '../components/GoogleMaps';

import { getImages } from '../globalActions';

export default async function Map() {
	const imageData = await getImages();

	return (
		<div>
			<h1>Map</h1>
			<GoogleMaps imageData={imageData} />
		</div>
	);
}
