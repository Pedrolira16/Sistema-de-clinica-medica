import BaseRoutes from "./base";
import DashboardController from "../controller/dashboard";
import SchemaValidator from "../utils/schemaValidator";
import dashboardSchema from "../schemas/dashboard";

class DashboardRoutes extends BaseRoutes {
	constructor() {
		super();
		this.dashboardController = new DashboardController();
	}

	setup() {
		this.router.get('/', SchemaValidator.validate(dashboardSchema.list), this.dashboardController.list);

		return this.router;
	}
}
export default DashboardRoutes;