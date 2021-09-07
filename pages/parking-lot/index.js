import ParkedList from '../../components/ParkingLot/ParkedList';
import mysql from 'mysql2/promise';

export async function getStaticProps() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
  });
  // query database
  const [rows, fields] = await connection.execute(
    `SELECT * FROM pl.ParkedCars`
  );

  const parkedCars = Object.values(JSON.parse(JSON.stringify(rows)));

  return {
    props: {
      parkedCars,
    },
  };
}

const ParkingLot = (props) => {
  return <ParkedList parkedCars={props.parkedCars} />;
};

export default ParkingLot;
