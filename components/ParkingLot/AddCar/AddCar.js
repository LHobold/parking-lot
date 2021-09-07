import React from 'react';
import { useParkContext } from '../../../src/store/park-context';
import styles from './AddCar.module.css';

const AddCar = (props) => {
  const parkCtx = useParkContext();
  const isFull = parkCtx.isFull;

  return (
    <div className={styles.container}>
      {!isFull && (
        <button onClick={props.onClick} className={styles['btn-add']}>
          <i aria-hidden className="fas fa-plus-circle"></i>
        </button>
      )}
      {isFull && <p className={styles.full}>FULL</p>}
      <div className={styles.parked}>
        <label htmlFor="parked">Parked cars</label>
        <p id="parked">{props.occupancy}</p>
      </div>
    </div>
  );
};

export default AddCar;
