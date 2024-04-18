import styles from './componentStyles/Navigation.module.css';

import camera from '../../../public/icons/camera-svgrepo-com.svg';
import shutter from '../../../public/icons/diaphragm.png';
import dashboard from '../../../public/icons/dashboard-svgrepo-com.svg';
import images from '../../../public/icons/images-svgrepo-com.svg';
import Image from 'next/image';

export const Navigation = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles.separator}>
				<div className={styles.navItem}>
					<a href='/camera'>
						<Image src={camera} alt='camera' height={50} width={50} />
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/dashboard'>
						<Image src={dashboard} alt='dashboard' height={50} width={50} />
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/images'>
						<Image src={images} alt='images' height={50} width={50} />
					</a>
				</div>
			</div>
		</nav>
	);
};
