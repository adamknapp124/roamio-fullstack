'use client';

import { CldImage } from 'next-cloudinary';

import React from 'react';

export default function CloudImage({ public_id }) {
	return <CldImage src={public_id} width={10000} height={200} alt='image' />;
}
