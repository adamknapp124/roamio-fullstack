'use client';

import styles from './componentStyles/map.module.css';

import { Loader } from '@googlemaps/js-api-loader';
import React, { useRef, useEffect } from 'react';

const MAPSAPIKEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export function GoogleMap() {
	const mapRef = useRef(null);

	useEffect(() => {
		const initMap = async () => {
			const loader = new Loader({
				apiKey: MAPSAPIKEY,
				version: 'weekly',
			});

			const { Map } = await loader.importLibrary('maps');

			const position = {
				lat: 43.642693,
				lng: -79.3871189,
			};

			// map options
			const mapOptions = (google.maps.mapOptions = {
				center: position,
				zoom: 17,
				mapId: 'MY_NEXTJS_MAPID',
			});

			// setup map
			const map = new Map(mapRef.current, mapOptions);
		};

		initMap();
	}, []);

	return <div ref={mapRef} className={styles.map}></div>;
}
