import styles from './componentStyles/navigation.module.css';

import camera from '../../../public/icons/camera-svgrepo-com.svg';
import logout from '../../../public/icons/logout-3-svgrepo-com.svg';
import login from '../../../public/icons/login-3-svgrepo-com.svg';
import dashboard from '../../../public/icons/dashboard-svgrepo-com.svg';
import images from '../../../public/icons/images-svgrepo-com.svg';
import map from '../../../public/icons/treasure-map.png';
import Image from 'next/image';

import { cookies } from 'next/headers';

export const Navigation = () => {
	const username = cookies().get('username');
	return (
		<nav className={styles.nav}>
			<div className={styles.separator}>
				<div className={styles.navItem}>
					<a href='/camera'>
						<Image src={camera} alt='camera' height={35} width={35} />
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/map'>
						<Image src={map} alt='map' height={35} width={35} />
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/dashboard'>
						<Image src={dashboard} alt='dashboard' height={35} width={35} />
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/images'>
						<Image src={images} alt='images' height={35} width={35} />
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/login'>
						<Image
							src={username && username ? logout : login}
							alt='images'
							height={35}
							width={35}
						/>
					</a>
				</div>
			</div>
		</nav>
	);
};
