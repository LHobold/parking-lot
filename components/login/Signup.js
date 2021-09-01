import React from 'react';
import styles from './Signup.module.css';
import Link from 'next/dist/client/link';
import { Formik } from 'formik';

const Signup = props => {
	return (
		<div className={styles['login']}>
			<h2 className={styles.title}>SIGNUP</h2>
			<Formik
				initialValues={{ email: '', password: '', cpassword: '' }}
				validate={values => {
					const errors = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address';
					}

					if (!values.password) {
						errors.password = 'Required';
					}
					if (!values.cpassword) {
						errors.cpassword = 'Required';
					} else if (values.cpassword !== values.password) {
						errors.cpassword = 'Passwords must match';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
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
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								name="email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
							<p className={styles['error-msg']}>
								{(errors.email && touched.email && errors.email) || '\u00A0'}
							</p>
						</div>
						<div className={styles['form-row']}>
							<label htmlFor="password">Password</label>
							<input
								id="password"
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								minLength="6"
							/>
							<p className={styles['error-msg']}>
								{(errors.password && touched.password && errors.password) ||
									'\u00A0'}
							</p>
						</div>
						<div className={styles['form-row']}>
							<label htmlFor="cpassword">Confirm Password</label>
							<input
								id="cpassword"
								type="password"
								name="cpassword"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.cpassword}
								minLength="6"
							/>
							<p className={styles['error-msg']}>
								{(errors.cpassword && touched.cpassword && errors.cpassword) ||
									'\u00A0'}
							</p>
						</div>
						<button
							type="submit"
							disabled={isSubmitting}
							className={`${styles['btn']} ${styles['btn--login']}`}
						>
							Login
						</button>
					</form>
				)}
			</Formik>
			<button className={styles['btn-login']}>
				<Link href="/auth/login">Already have an account? Login here!</Link>
			</button>
		</div>
	);
};

export default Signup;
