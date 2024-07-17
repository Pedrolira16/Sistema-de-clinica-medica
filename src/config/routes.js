import { Router} from 'express';
import CompanyRoutes from '../routes/company';
import UserRoutes from '../routes/user';
import PatientRoutes from '../routes/patient';

export default class Routes {
	constructor() {
		this.router = Router();
		this.companyRoutes= new CompanyRoutes();
		this.userRoutes = new UserRoutes();
		this.patientRoutes = new PatientRoutes();
	}

	setup() {
		this.router.use('/auth', this.companyRoutes.setup());
		this.router.use('/users', this.userRoutes.setup());
		this.router.use('/patients', this.patientRoutes.setup());
		
		return this.router;
	};
}