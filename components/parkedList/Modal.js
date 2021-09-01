import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import formatTime from '../../lib/formatTime';

const BackDrop = props => {
	return <div onClick={props.onClick} className={styles.backdrop}></div>;
};

const ModalOverlay = props => {
	const arrivedAt = new Date(props.content.arrivedAt).toLocaleDateString(
		'en-us',
		{
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		}
	);

	const timeInLot = arrivedAt => {
		const nowMs = Date.now();
		const arrivedAtMs = new Date(props.content.arrivedAt).getTime();
		const timeInMiliseconds = nowMs - arrivedAtMs;
		return formatTime(timeInMiliseconds);
	};

	return (
		<div className={styles.modal}>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={styles.content}>
				<div className={styles['car-info']}>
					<div className={styles.info}>
						<label htmlFor="plate">Car plate</label>
						<p id="plate">{props.content.plate}</p>
					</div>
					<div className={styles.info}>
						<label htmlFor="model">Car model</label>
						<p id="model">{props.content.model}</p>
					</div>
					<div className={styles.info}>
						<label htmlFor="color">Car color</label>
						<p id="color">{props.content.color}</p>
					</div>
					<div className={styles.info}>
						<label htmlFor="color">Entry time</label>
						<p id="color">{arrivedAt}</p>
					</div>
					<div className={styles.info}>
						<label htmlFor="color">Time in lot</label>
						<p id="color">{timeInLot(props.content.arrivedAt)}</p>
					</div>
				</div>
			</div>
			<footer className={styles.actions}>
				<button className={styles['btn-close']} onClick={props.onClick}>
					Close
				</button>
			</footer>
		</div>
	);
};

const Modal = props => {
	return (
		<>
			{ReactDOM.createPortal(
				<BackDrop onClick={props.onClick} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					onClick={props.onClick}
					title={props.title}
					message={props.message}
					content={props.content}
				/>,
				document.getElementById('backdrop-root')
			)}
		</>
	);
};

export default Modal;
