import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise'; // Import mysql2 with promises support

export async function GET() {
	try {
		// Create a connection to the MySQL database
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
		});

		// Query the database
		const [rows, fields] = await connection.query('SELECT * FROM users');

		// Close the connection
		await connection.end();

		// Send data back to the client
		return NextResponse.json({
			data: rows,
		});
	} catch (error) {
		console.error('Error fetching data from MySQL:', error);
		return NextResponse.error({ status: 500, message: 'Failed to fetch users' });
	}
}
