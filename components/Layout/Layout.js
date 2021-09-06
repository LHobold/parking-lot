import React, { Fragment } from 'react';
import styles from './Layout.module.css';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../../assets/logo.svg';

const Layout = props => {
	return (
		<Fragment>
			<header className={styles.header}>
				<div className={styles.logo}>Estacioncar</div>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/6/65/Circle-icons-car.svg"
					alt="Estacioncar logo"
				/>
				<nav className={styles['main-nav']}>
					<ul>
						<li>
							<Link href="/parking-lot/settings" passHref>
								<a className={styles.btn}>Settings</a>
							</Link>
						</li>
						<li>
							<Link href="/parking-lot" passHref>
								<a className={`${styles['btn']} ${styles['btn--login']}`}>
									Parking Lot
								</a>
							</Link>

							{/* {isLoggedIn && (
								<Link href="/parking-lot" passHref>
									<a className={`${styles['btn']} ${styles['btn--login']}`}>
										Logout
									</a>
								</Link>
							)} */}
						</li>
					</ul>
				</nav>
			</header>
			<main className={styles.main}>{props.children}</main>
		</Fragment>
	);
};
export default Layout;
