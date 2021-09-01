import React, { Fragment, useEffect } from 'react';
import ParkedCar from './parkedCar';
import styles from './ParkedList.module.css';
import Modal from './Modal';
import AddCar from './addCar/AddCar';
import AddCarModal from './AddCar/AddCarModal';
import LoadingSpinner from '../UI/LoadingSpinner';

const ParkedList = props => {
	const [parkedCars, setParkedCars] = React.useState(props.parkedCars);
	const [detailsIsShown, setDetailsIsShown] = React.useState(false);
	const [addCarModalIsShown, setAddCarModalIsShown] = React.useState(false);
	const [modalContent, setModalContent] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);

	const maxSlots = 50;
	const occupancy = `${parkedCars.length}/${maxSlots}`;

	const handleDetailsClose = () => {
		setDetailsIsShown(false);
	};

	const handleAddCarClose = () => {
		setAddCarModalIsShown(false);
	};

	const handleAddCarOpen = () => {
		setAddCarModalIsShown(true);
	};

	const handleDetails = id => {
		const parkedCarDetail = parkedCars.filter(car => car.id === id)[0];
		setModalContent(parkedCarDetail);
		setDetailsIsShown(true);
	};

	const handleAddCar = newCar => {
		setParkedCars(prevState => {
			return [...prevState, newCar];
		});
	};

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<div className="centered">
				<LoadingSpinner />;
			</div>
		);
	}

	return (
		<Fragment>
			<AddCar onClick={handleAddCarOpen} occupancy={occupancy} />
			{addCarModalIsShown && (
				<AddCarModal
					onAddCar={handleAddCar}
					onClick={handleAddCarClose}
					title="Add a car to the parking lot"
				/>
			)}
			<div className={styles.list}>
				{detailsIsShown && (
					<Modal
						onClick={handleDetailsClose}
						content={modalContent}
						title="Parked car detail"
					/>
				)}
				{parkedCars.length === 0 && (
					<p className="centered focused">No cars in the lot.</p>
				)}
				{parkedCars.length > 0 && (
					<ul>
						{parkedCars.map(car => (
							<ParkedCar
								key={car.id}
								id={car.id}
								plate={car.plate}
								model={car.model}
								color={car.color}
								onDetails={handleDetails}
							/>
						))}
					</ul>
				)}
			</div>
		</Fragment>
	);
};

export default ParkedList;
