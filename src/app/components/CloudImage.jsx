'use client';

import { CldImage } from 'next-cloudinary';

import React from 'react';

export default function CloudImage({ public_id }) {
	return <CldImage width={100} height={150} src={public_id} alt='image' />;
}
