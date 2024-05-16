import styles from './navigation.module.css';

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
						<span>Camera</span>
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/map'>
						<Image src={map} alt='places' height={35} width={35} />
						<span>Places</span>
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/'>
						<Image src={dashboard} alt='dashboard' height={35} width={35} />
						<span>Dashboard</span>
					</a>
				</div>
				<div className={styles.navItem}>
					<a href='/gallery'>
						<Image src={images} alt='gallery' height={35} width={35} />
						<span>Gallery</span>
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
						{/* Login/Logout if used signed in/signed out */}
						<span>{username && username ? 'logout' : 'login'}</span>
					</a>
				</div>
			</div>
		</nav>
	);
};
