import mysql from 'mysql2/promise';

export async function dbConnection() {
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'Talon511!',
		database: 'road_trip',
	});
	return connection;
}
