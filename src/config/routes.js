import { Router} from 'express';
import CompanyRoutes from '../routes/company';
import UserRoutes from '../routes/user';
import PatientRoutes from '../routes/patient';
import PlacesRoutes from '../routes/places';
import AttendanceRoutes from '../routes/attendance';
import ReportsRoutes from '../routes/reports';
import DashboardRoutes from '../routes/dashboard';
import Authenticator from '../middlewares/auth';

export default class Routes {
	constructor() {
		this.router = Router();
		this.companyRoutes= new CompanyRoutes();
		this.userRoutes = new UserRoutes();
		this.patientRoutes = new PatientRoutes();
		this.placesRoutes = new PlacesRoutes();
		this.attendanceRoutes = new AttendanceRoutes();
		this.reportsRoutes = new ReportsRoutes();
		this.dashboardRoutes = new DashboardRoutes();
	}

	setup() {
		this.router.use('/auth', this.companyRoutes.setup());
		this.router.use('/users', this.userRoutes.setup());
		this.router.use('/patients', Authenticator.verifyToken, this.patientRoutes.setup());
		this.router.use('/places',Authenticator.verifyToken, this.placesRoutes.setup());
		this.router.use('/attendances', Authenticator.verifyToken, this.attendanceRoutes.setup());
		this.router.use('/reports', Authenticator.verifyToken, this.reportsRoutes.setup());
		this.router.use('/dashboard', Authenticator.verifyToken, this.dashboardRoutes.setup());

		return this.router;
	};
}