import BaseRoutes from "./base";
import Authenticator from "../middlewares/auth";
import ReportsController from "../controller/report";

class ReportsRoutes extends BaseRoutes {
	constructor() {
		super();
		this.reportController = new ReportsController
	}

setup() {
	this.router.get('/attendances', this.reportController.attendance);

	return this.router;
	}
}
export default ReportsRoutes;