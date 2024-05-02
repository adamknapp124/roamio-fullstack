import GoogleMaps from '../components/GoogleMaps';

import { getImages } from '../globalActions';

export default async function Map() {
	const imageData = await getImages();

	return <GoogleMaps imageData={imageData} />;
}
