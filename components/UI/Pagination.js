import styles from './Pagination.module.css';
import PaginationJs from 'react-js-pagination';
import { useParkContext } from '../../src/store/park-context';

const Pagination = props => {
	const parkCtx = useParkContext();

	const handlePageChange = pageNumber => {
		parkCtx.handleChangePage(pageNumber - 1);
	};

	const pagOpt = {
		activePage: parkCtx.curPage + 1,
		itemsCountPerPage: parkCtx.carsPerPage,
		totalItemsCount: parkCtx.searchLength,
		pageRangeDisplayed: 5,
		onChange: handlePageChange,
		itemClass: styles.item,
		innerClass: styles.list,
		activeClass: styles.active,
		linkClass: styles.arrows,
	};

	return (
		<div className={styles.pagination}>
			<PaginationJs {...pagOpt} />
		</div>
	);
};

export default Pagination;
