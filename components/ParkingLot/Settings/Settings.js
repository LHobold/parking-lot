import styles from './Settings.module.css';
import { Formik } from 'formik';
import { useParkContext } from '../../../src/store/park-context';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Settings = () => {
	const parkCtx = useParkContext();
	const router = useRouter();
	const [isSaving, setIsSaving] = useState();

	return (
		<div className={styles.container}>
			<Formik
				initialValues={{
					maxCars: +parkCtx.maxCars,
					costPerHour: +parkCtx.costPerHour,
				}}
				validate={values => {
					const errors = {};
					if (+values.maxCars < 0) {
						errors.maxCars = 'Needs to be above 0';
					}
					
					if (+values.costPerHour < 0) {
						errors.costPerHour = 'Needs to be above 0';
					}

					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(true);
					setIsSaving('Saving...');
					const { costPerHour, maxCars } = values;
					parkCtx.handleCostPerHourChange(costPerHour);
					parkCtx.handleMaxCarsChange(maxCars);

					setTimeout(() => {
						setIsSaving('Saved!');
						setSubmitting(false);
					}, 2000);

					setTimeout(() => {
						router.push('/parking-lot');
					}, 3000);
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
							<label htmlFor="maxCars">Max parkings slots</label>
							<input
								id="maxCars"
								type="number"
								name="maxCars"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.maxCars || parkCtx.maxCars}
							/>
							<p className={styles['error-msg']}>
								{(errors.maxCars && touched.maxCars && errors.maxCars) ||
									'\u00A0'}
							</p>
						</div>
						<div className={styles['form-row']}>
							<label htmlFor="costPerHour">Cost per hour</label>
							<input
								id="costPerHour"
								type="number"
								name="costPerHour"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.costPerHour}
								step="0.01"
							/>
							<p className={styles['error-msg']}>
								{(errors.costPerHour &&
									touched.costPerHour &&
									errors.costPerHour) ||
									'\u00A0'}
							</p>
						</div>
						<button
							type="submit"
							disabled={isSubmitting}
							className={`${styles['btn']} ${styles['btn--save']}`}
						>
							{isSaving ? isSaving : 'Save'}
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default Settings;
