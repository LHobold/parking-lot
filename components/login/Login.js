import React from 'react';
import styles from './Login.module.css';
import Link from 'next/dist/client/link';
import { Formik } from 'formik';

const Login = props => {
	return (
		<div className={styles['login']}>
			<h2 className={styles.title}>LOGIN</h2>
			<Formik
				initialValues={{ email: '', password: '' }}
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
			<button className={styles['btn-signup']}>
				<Link href="/auth/signup">Dont have an account? Sign up here!</Link>
			</button>
		</div>
	);
};

export default Login;
