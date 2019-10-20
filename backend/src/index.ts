import 'dotenv/config'
import * as express from 'express';
import Server from './Server';
import dbcon from './lib/dbcon';

dbcon.connection();

const app: express.Application = Server.getInstance();

const PORT: number = parseInt(process.env.PORT) || 3000;

app.listen(PORT, () => {
	console.log(`server is running at PORT ${PORT}`);
});