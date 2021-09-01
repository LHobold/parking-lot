import React from 'react';
import styles from './ParkedCar.module.css';

const ParkedCar = props => {
	const carId = props.id;

	return (
		<li className={styles['parked-car']}>
			<div className={styles['car-info']}>
				<div className={styles.info}>
					<label htmlFor="plate">Car plate</label>
					<p id="plate">{props.plate}</p>
				</div>
				<div className={styles.info}>
					<label htmlFor="model">Car model</label>
					<p id="model">{props.model}</p>
				</div>
				<div className={styles.info}>
					<label htmlFor="color">Car color</label>
					<p id="color">{props.color}</p>
				</div>
			</div>
			<div className={styles['action']}>
				<button onClick={() => props.onDetails(carId)}>
					<i aria-hidden className="fas fa-search-plus"></i>
				</button>
				<button>
					<i aria-hidden className="fas fa-times"></i>
				</button>
			</div>
		</li>
	);
};

export default ParkedCar;
