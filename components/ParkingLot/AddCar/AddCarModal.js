import React from 'react';
import styles from './AddCarModal.module.css';
import ReactDOM from 'react-dom';
import { Formik } from 'formik';
import { useParkContext } from '../../../src/store/park-context';

const BackDrop = (props) => {
  return <div onClick={props.onClick} className={styles.backdrop}></div>;
};

const ModalOverlay = (props) => {
  const parkCtx = useParkContext();
  const [sendingData, setSendingData] = React.useState(null);

  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>

      <Formik
        initialValues={{ model: '', color: '', plate: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.model) {
            errors.model = 'Required';
          }

          if (!values.color) {
            errors.color = 'Required';
          }

          if (!values.plate) {
            errors.plate = 'Required';
          } else if (values.plate.trim().length !== 7) {
            errors.plate = 'Invalid plate';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSendingData('Adding...');
          const res = await fetch('/api/parked-cars', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (data.status === 'success') {
            parkCtx.addCar(data.data);
            setSendingData('Added');
          } else {
            setSendingData('Error');
          }
          setSubmitting(false);
          setTimeout(props.onClick, 2000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles['form-row']}>
              <label htmlFor="model">Car model</label>
              <input
                id="model"
                type="text"
                name="model"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.model}
              />
              <p className={styles['error-msg']}>
                {(errors.model && touched.model && errors.model) || '\u00A0'}
              </p>
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="color">Car color</label>
              <input
                id="color"
                type="text"
                name="color"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.color}
              />
              <p className={styles['error-msg']}>
                {(errors.color && touched.color && errors.color) || '\u00A0'}
              </p>
            </div>
            <div className={styles['form-row']}>
              <label htmlFor="plate">Car plate</label>
              <input
                id="plate"
                type="text"
                name="plate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.plate}
                minLength="7"
              />
              <p className={styles['error-msg']}>
                {(errors.plate && touched.plate && errors.plate) || '\u00A0'}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles['btn']} ${styles['btn--login']}`}
            >
              {sendingData ? sendingData : 'Add car'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

const AddCarModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClick} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClick={props.onClick} title={props.title} />,
        document.getElementById('backdrop-root')
      )}
    </>
  );
};

export default AddCarModal;
