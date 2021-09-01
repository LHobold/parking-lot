import mysql from 'mysql2/promise';
import currDateSql from '../../lib/currDateSql';

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
			const connection = await mysql.createConnection({
				host: process.env.DB_HOSTNAME,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_DATABASE,
			});
			const now = currDateSql();
			const insertQuery = `INSERT INTO pl_ParkedCars (model,color,plate,arrivedAt) VALUES ('${model}','${color}','${plate}','${now}')`;
			const [rows, fields] = await connection.execute(insertQuery);

			const id = JSON.parse(JSON.stringify(rows)).insertId;
			const data = { id, model, color, plate, arrivedAt: now };

			res.status(201).json({
				status: 'success',
				data,
			});
		} catch (err) {
			res.status(400).json({
				data: {
					status: 'error',
					message: err.message,
				},
			});
		}
	}
}
