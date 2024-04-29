'use client';

import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useRef } from 'react';

import styles from './componentStyles/GoogleMaps.module.css';

export default function GoogleMaps({ imageData }) {
	const mapRef = useRef(null);

	console.log('lat: ', imageData[0].lat);

	console.log(typeof Number(imageData[0].lat));
	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
				version: 'weekly',
			});

			const { Map } = await loader.importLibrary('maps');

			const options = {
				center: {
					lat: Number(imageData[1].lat),
					lng: Number(imageData[1].lon),
				},
				zoom: 8,
				mapId: 'Nextjs-Maps',
			};

			const map = new Map(mapRef.current, options);

			// Add marker
			const { Marker } = await loader.importLibrary('marker');
			imageData.map((image) => {
				const marker = new google.maps.marker.AdvancedMarkerElement({
					map: map,
					position: {
						lat: Number(image.lat),
						lng: Number(image.lon),
					},
				});
			});
		};
		initializeMap();
	}, []);

	return <div className={styles.mapContainer} ref={mapRef}></div>;
}
