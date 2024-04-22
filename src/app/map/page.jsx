import styles from './map.module.css';
import { GoogleMap } from '../components/GoogleMap';

export default function Map() {
	return (
		<div>
			<h1>Map</h1>
			<GoogleMap />
		</div>
	);
}
