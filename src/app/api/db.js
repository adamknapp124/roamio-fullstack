const mysql = require('mysql2');

export function dbConnection() {
	console.log('connection requested');
	const connection = mysql.createConnection({
		host: 'my-roamio-db.ct0qkum0i4un.us-west-2.rds.amazonaws.com',
		user: 'admin',
		database: 'roamio',
		password: 'md1k8xZ3SmlQeYXeuxnJ',
	});
	return connection;
}
