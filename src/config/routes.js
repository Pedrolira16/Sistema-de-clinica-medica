import { Router} from 'express';
import CompanyRoutes from '../routes/company';
import UserRoutes from '../routes/user';
import PatientRoutes from '../routes/patient';
import PlacesRoutes from '../routes/places';
import AttendanceRoutes from '../routes/attendance';
import ReportsRoutes from '../routes/reports';

export default class Routes {
	constructor() {
		this.router = Router();
		this.companyRoutes= new CompanyRoutes();
		this.userRoutes = new UserRoutes();
		this.patientRoutes = new PatientRoutes();
		this.placesRoutes = new PlacesRoutes();
		this.attendanceRoutes = new AttendanceRoutes();
		this.reportsRoutes = new ReportsRoutes();
	}

	setup() {
		this.router.use('/auth', this.companyRoutes.setup());
		this.router.use('/users', this.userRoutes.setup());
		this.router.use('/patients', this.patientRoutes.setup());
		this.router.use('/places',this.placesRoutes.setup());
		this.router.use('/attendances', this.attendanceRoutes.setup());
		this.router.use('/reports', this.reportsRoutes.setup());
		
		return this.router;
	};
}