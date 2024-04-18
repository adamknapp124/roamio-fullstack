import styles from './componentStyles/Navigation.module.css';

export const Navigation = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles.unorderedList}>
				<div className={styles.separator}>
					<div className={styles.listItem}>Roamio</div>
				</div>
				<div className={styles.separator}>
					<div className={styles.listItem}>Camera</div>
					<div className={styles.listItem}>Dashboard</div>
					<div className={styles.listItem}>Images</div>
				</div>
			</div>
		</nav>
	);
};
