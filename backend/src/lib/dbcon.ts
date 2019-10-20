import { createConnection, Connection } from 'typeorm';

class DB_CONNECT {
	public async connection() {
		try {
			const db: Connection = await createConnection();
			console.log('connect mysql DB');
			return db;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new DB_CONNECT();