import * as express from 'express';
import routes from './api';
import * as cors from 'cors'
import * as bodyParser from 'body-parser';

class Server {
	private App: express.Application;

	constructor() {
		bodyParser.json();
		bodyParser.urlencoded({ extended: false });
		this.App = express();
		this.App.use(cors());
		this.App.use(bodyParser());
		this.App.use('/', routes);
	}

	public getInstance() {
		return this.App;
	}
}

export default new Server();