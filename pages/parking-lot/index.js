import ParkedList from '../../components/parkedList/parkedList';
import mysql from 'mysql2/promise';

// export async function getStaticProps(context) {
// 	function get_data(callback) {
// 		const pool = createPool({
// host: process.env.DB_HOSTNAME,
// user: process.env.DB_USER,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_DATABASE,
// 		});

// 		pool.query(`SELECT * FROM pl_ParkedCars`, (err, rows) => {
// 			const result = Object.values(JSON.parse(JSON.stringify(rows)));
// 			return callback(result);
// 		});
// 	}

// 	const data = get_data(result => {
// 		return result;
// 	});

// 	console.log('21', data);

// 	return {
// 		props: {
// 			parkedCars: 'buc',
// 		},
// 	};
// }

export async function getStaticProps() {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOSTNAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	});
	// query database
	const [rows, fields] = await connection.execute(
		`SELECT * FROM pl_ParkedCars`
	);

	const parkedCars = Object.values(JSON.parse(JSON.stringify(rows)));

	return {
		props: {
			parkedCars,
		},
	};
}

const ParkingLot = props => {
	return <ParkedList parkedCars={props.parkedCars} />;
};

export default ParkingLot;
