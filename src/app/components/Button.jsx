import Image from 'next/image';

export const Button = ({
	buttonText,
	purpose,
	src,
	image,
	width,
	height,
	transparent,
}) => {
	return (
		<button
			onClick={purpose}
			style={{
				backgroundColor: transparent ? 'transparent' : null,
				border: 'none',
			}}>
			{image ? (
				<Image src={src} width={width} height={height} alt={src.toString()} />
			) : (
				buttonText
			)}
		</button>
	);
};
