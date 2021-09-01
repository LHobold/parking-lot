import React from 'react';
import styles from './AddCar.module.css';

const AddCar = props => {
	return (
		<div className={styles.container}>
			<button onClick={props.onClick} className={styles['btn-add']}>
				<i aria-hidden className="fas fa-plus-circle"></i>
			</button>
			<div className={styles.parked}>
				<label htmlFor="parked">Parked cars</label>
				<p id="parked">{props.occupancy}</p>
			</div>
		</div>
	);
};

export default AddCar;
