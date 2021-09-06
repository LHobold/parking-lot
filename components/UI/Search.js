import { useRef } from 'react';
import { useParkContext } from '../../src/store/park-context';
import styles from './Search.module.css';

const Search = () => {
	const searchRef = useRef();
	const parkCtx = useParkContext();

	const handleChange = () => {
		const search = searchRef.current.value;
		parkCtx.handleChangePage(0);
		parkCtx.handleSearch(search);
	};

	const handleClearField = () => {
		searchRef.current.value = '';
		parkCtx.handleSearch('');
	};

	return (
		<div className={styles['search-bar']}>
			<form>
				<input
					type="text"
					ref={searchRef}
					placeholder="Search"
					onChange={handleChange}
				></input>
			</form>
			<button onClick={handleClearField} className={styles['btn-clear']}>
				<i aria-hidden className="fas fa-times"></i>
			</button>
		</div>
	);
};

export default Search;
