import styles from './componentStyles/Navigation.module.css';

export const Navigation = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles.unorderedList}>
				<div className={styles.separator}>
					<div className={styles.listItem}>
						<a href='/'>Roamio</a>
					</div>
				</div>
				<div className={styles.separator}>
					<div className={styles.listItem}>
						<a href='/camera'>Camera</a>
					</div>
					<div className={styles.listItem}>
						<a href='/dashboard'>Dashboard</a>
					</div>
					<div className={styles.listItem}>
						<a href='/images'>Images</a>
					</div>
				</div>
			</div>
		</nav>
	);
};
