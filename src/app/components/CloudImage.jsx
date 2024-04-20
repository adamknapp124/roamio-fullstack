'use client';

import { CldImage } from 'next-cloudinary';

import React from 'react';

export default function CloudImage({ public_id }) {
	return <CldImage width='250' height='400' src={public_id} alt='image' />;
}
