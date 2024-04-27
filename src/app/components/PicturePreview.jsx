'use client';

export default function PicturePreview({ photoPreview }) {
	async function handleClick() {
		try {
			const res = await fetch('http://localhost:3000/api/camera', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(photoPreview),
			});

			if (res.ok) {
				const data = await res.json();
				return data;
			}
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return (
		<>
			<img src={photoPreview} alt='photo' />
			<input type='file' filename={photoPreview} />
			<button onClick={handleClick}>Save Photo</button>
		</>
	);
}
