import React, { Fragment, useEffect } from 'react';
import ParkedCar from './parkedCar';
import styles from './ParkedList.module.css';
import Modal from './Modal';
import AddCar from './addCar/AddCar';
import AddCarModal from './AddCar/AddCarModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useParkContext } from '../../src/store/park-context';
import Pagination from '../UI/Pagination';
import Search from '../UI/Search';
import MessageModal from '../UI/messageModal';

const ParkedList = props => {
	const parkCtx = useParkContext();
	const { handleParkedCarsData, parkedCars: ctxParkedCars } = parkCtx;
	const [parkedCars, setParkedCars] = React.useState(props.parkedCars);

	// Here you're going to store data into ContextAPI appropriatly.
	useEffect(() => {
		if (
			typeof props.parkedCars === 'object' &&
			props.parkedCars.length > 0 &&
			ctxParkedCars.length <= 0
		) {
			handleParkedCarsData(props.parkedCars);
		}
	}, [handleParkedCarsData, props.parkedCars, ctxParkedCars]);

	// Other times your page is loaded, you will GET this data from ContextAPI, instead of SSR props.
	useEffect(() => {
		if (ctxParkedCars.length >= 0) {
			setParkedCars(ctxParkedCars);
		}
	}, [ctxParkedCars]);

	const [detailsIsShown, setDetailsIsShown] = React.useState(false);
	const [addCarModalIsShown, setAddCarModalIsShown] = React.useState(false);
	const [modalContent, setModalContent] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);

	const [removedCarInfo, setRemovedCarInfo] = React.useState(null);
	const [costModalIsShown, setCostModalIsShown] = React.useState(false);

	const maxSlots = parkCtx.maxCars;
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

	const handleParkingFee = carInfo => {
		setRemovedCarInfo(carInfo);
		setCostModalIsShown(true);
	};

	const handleCostModalIsShown = () => {
		setCostModalIsShown(false);
	};

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<Fragment>
			<AddCar onClick={handleAddCarOpen} occupancy={occupancy} />

			{costModalIsShown && (
				<MessageModal
					title="Car removed from parking lot"
					message={`The car has been removed from the parking lot.`}
					onClick={handleCostModalIsShown}
					content={removedCarInfo}
					confirm={false}
				/>
			)}
			{addCarModalIsShown && (
				<AddCarModal
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

				{parkedCars.length <= 0 && (
					<p className="centered focused">No cars found.</p>
				)}

				{parkedCars.length >= 1 && (
					<Fragment>
						<Search />
						<ul className={styles['parked-cars-list']}>
							{parkCtx.loadedContent.map(car => (
								<ParkedCar
									key={car.id}
									id={car.id}
									plate={car.plate}
									model={car.model}
									color={car.color}
									onDetails={handleDetails}
									displayCost={handleParkingFee}
								/>
							))}
						</ul>
						<Pagination />
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default ParkedList;
