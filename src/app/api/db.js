const mysql = require('mysql2/promise');

export async function dbConnection() {
	console.log('connection requested');
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	});
	return connection;
}
