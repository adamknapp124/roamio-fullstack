const mysql = require('mysql2/promise');

export async function dbConnection() {
	console.log('connection requested');
	const connection = await mysql.createConnection({
		host: 'my-roamio-db.ct0qkum0i4un.us-west-2.rds.amazonaws.com',
		user: 'admin',
		database: 'roamio',
		password: 'md1k8xZ3SmlQeYXeuxnJ',
	});
	return connection;
}
