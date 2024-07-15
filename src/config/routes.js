import { Router} from 'express';
import CompanyRoutes from '../routes/company';


export default class Routes {
	constructor() {
		this.router = Router();
		this.companyRoutes= new CompanyRoutes();
	}

	setup() {
		this.router.use('/auth', this.companyRoutes.setup());
		
		return this.router;
	}
}