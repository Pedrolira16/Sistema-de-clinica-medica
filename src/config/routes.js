import { Router} from 'express';

export default class Routes {
	constructor() {
		this.router = Router();
	}

	setup() {
		this.router.get('/', (req, res) => {
			res.send('Hello World');
		});

		return this.router;
	}
}