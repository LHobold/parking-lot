import mysql from 'mysql2/promise';
import currDateSql from '../../lib/currDateSql';

const connectToSql = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
  });
  return connection;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { model, color, plate } = req.body;
      if (!model || !color || !plate) {
        throw new Error('All fields must be correctly filled!');
      }
      if (plate.trim().length !== 7) {
        throw new Error('Incorrect plate!');
      }
      const connection = await connectToSql();
      const now = currDateSql();
      const insertQuery = `INSERT INTO pl.ParkedCars (model,color,plate,arrivedAt) VALUES ('${model}','${color}','${plate}','${now}')`;
      const [rows, fields] = await connection.execute(insertQuery);

      const id = JSON.parse(JSON.stringify(rows)).insertId;
      const data = { id, model, color, plate, arrivedAt: now };

      res.status(201).json({
        status: 'success',
        data,
      });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { parkedCarId, costPerHour } = req.body;

      if (!parkedCarId) {
        throw new Error('No parked car ID provided.');
      }

      if (!costPerHour) {
        throw new Error('No cost per hour provided.');
      }

      const connection = await connectToSql();

      // GRAB PARKED CAR INFO FROM DB
      const selectQuery = `SELECT * FROM pl.ParkedCars WHERE pl.ParkedCars.id = ${parkedCarId}`;
      const [rows, fields] = await connection.execute(selectQuery);
      const parkedCarInfo = JSON.parse(JSON.stringify(rows));
      const { model, color, plate, arrivedAt } = parkedCarInfo[0];

      // // INSERT PARKED CAR INTO HISTORY DB
      const now = currDateSql();
      const hoursAtParkingLot = Math.ceil(
        (new Date(now) - new Date(arrivedAt)) / (1000 * 60 * 60)
      );
      const valueToPay = costPerHour * hoursAtParkingLot;
      const insertQuery = `INSERT INTO pl.ParkedCarsHistory (model,color,plate,arrivedAt,leftAt,payed) VALUES ('${model}','${color}','${plate}','${arrivedAt}','${now}','${valueToPay}')`;
      await connection.execute(insertQuery);

      // DELETE FROM DB
      const deleteQuery = `DELETE FROM pl.ParkedCars WHERE pl.ParkedCars.id = ${parkedCarId}`;
      await connection.execute(deleteQuery);

      res.status(200).json({
        status: 'success',
        data: {
          hoursAtParkingLot,
          costPerHour,
          valueToPay,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message,
      });
    }
  }
}
