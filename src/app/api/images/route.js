import { NextResponse } from 'next/server';
import { dbConnection } from '../db.js';

export async function GET() {
	try {
		// Create a connection to the MySQL database
		const connection = await dbConnection();

		// Query the database
		const [rows, fields] = await connection.query('SELECT * FROM gallery');

		// Close the connection
		await connection.end();

		// Send data back to the client
		return NextResponse.json({
			// Return the rows from the database
			data: rows,
		});
	} catch (error) {
		// Log the error to the console
		console.error('Error fetching data from MySQL:', error);
		// Return an error response
		return NextResponse.error({ status: 500, message: 'Failed to fetch users' });
	}
}
