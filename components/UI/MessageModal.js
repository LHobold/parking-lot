import React from 'react';
import styles from './MessageModal.module.css';
import ReactDOM from 'react-dom';

const BackDrop = (props) => {
  return <div onClick={props.onClick} className={styles.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>

        {props.carInfo && (
          <div className={styles['cost-content']}>
            <p>
              Car stood in the parking lot for:&nbsp;
              <span>{props.carInfo.hoursAtParkingLot} hours</span>
            </p>
            <p>
              Cost per hour: <span>${props.carInfo.costPerHour}</span>
            </p>
            <p>
              Value to pay: <span>${props.carInfo.valueToPay}</span>
            </p>
          </div>
        )}
      </div>
      <footer className={styles.actions}>
        {props.confirm && (
          <button className={styles['btn-confirm']} onClick={props.onConfirm}>
            Confirm
          </button>
        )}
        <button className={styles['btn-close']} onClick={props.onClick}>
          Close
        </button>
      </footer>
    </div>
  );
};

const MessageModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClick} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClick={props.onClick}
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
          confirm={props.confirm}
          carInfo={props.content}
        />,
        document.getElementById('backdrop-root')
      )}
    </>
  );
};

export default MessageModal;
