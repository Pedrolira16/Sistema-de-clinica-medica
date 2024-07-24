import BaseController from "./base";
import DashboardService from "../services/dashboard";

class DashboardController extends BaseController {
	constructor() {
		super();
		this.dashboardService = new DashboardService();
		this.bindActions(['list']);
	}

	async list(req, res) {
		try {
			const response = await this.dashboardService.list({
				...req.filter,
				company_id: req.companyId
			});

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(req, res, error);
		}
	}
}
export default DashboardController;