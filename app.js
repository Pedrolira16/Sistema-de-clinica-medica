import Routes from './src/config/routes.js';
import express from 'express';
import cors from 'cors';
import Database from './src/config/database.js';
import env from 'dotenv';

env.config();

class App {
	constructor() {
		this.app = express();

		this.databaseModule = new Database();
	}

	async initializeModules() {
		return Promise.all([
			this.databaseModule.connect()
		]);
	}

	async setup() {
		await this.initializeModules()
		this.app.use(express.json());

		this.app.use(express.urlencoded({ extended: false }));

		this.app.use(cors());

		const routes = new Routes();

		this.app.use(routes.setup());
	}

	start() {
		this.setup();
		this.app.listen(3500);
	}
}

export default App;