import React, { Fragment, useState } from 'react';
import { useParkContext } from '../../src/store/park-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import MessageModal from '../UI/messageModal';
import styles from './ParkedCar.module.css';

const ParkedCar = props => {
	const carId = props.id;
	const parkCtx = useParkContext();
	const [isDeleting, setIsDeleting] = useState(false);
	const [confirmModalIsShown, setConfirmModalIsShown] = useState(false);
	const [errorModalIsShown, setErrorModalIsShown] = useState(false);

	const handleConfirm = async () => {
		setConfirmModalIsShown(false);
		setIsDeleting(true);
		const parkedCar = {
			parkedCarId: carId,
			costPerHour: parkCtx.costPerHour,
		};

		const res = await fetch('/api/parked-cars', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(parkedCar),
		});

		if (res.ok) {
			const data = await res.json();
			setIsDeleting(false);
			props.displayCost(data.data);
			parkCtx.removeCar(carId);
		} else {
			setErrorModalIsShown(true);
			setIsDeleting(false);
		}
	};

	const handleErrorModalIsShown = () => {
		setErrorModalIsShown(false);
	};

	const handleConfirmModalIsShown = () => {
		setConfirmModalIsShown(false);
	};

	const handleRemoveParkedCar = () => {
		setConfirmModalIsShown(true);
	};

	return (
		<Fragment>
			{confirmModalIsShown && (
				<MessageModal
					title="Confirm car removal"
					message={`Do you really want to remove the car with plate: ${props.plate}?`}
					onClick={handleConfirmModalIsShown}
					confirm={true}
					onConfirm={handleConfirm}
				/>
			)}

			{errorModalIsShown && (
				<MessageModal
					title="Error"
					message="Something went wrong!"
					confirm={false}
					onClick={handleErrorModalIsShown}
				/>
			)}

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
					{isDeleting && (
						<div className={styles.spinner}>
							<LoadingSpinner small />
						</div>
					)}
					<button onClick={() => props.onDetails(carId)}>
						<i aria-hidden className="fas fa-search-plus"></i>
					</button>
					<button onClick={handleRemoveParkedCar}>
						<i aria-hidden className="fas fa-times"></i>
					</button>
				</div>
			</li>
		</Fragment>
	);
};

export default ParkedCar;
