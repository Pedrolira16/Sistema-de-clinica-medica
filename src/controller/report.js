import BaseController from "./base";
import ReportsService from "../services/report";

class ReportsController extends BaseController {
	constructor() {
		super();
		this.reportsService = new ReportsService();
		this.bindActions(['attendance']);
	}

	async attendance(req, res){
		try {
			const response = await this.reportsService.attendance({
				user_id: req.userId,
				company_id: req.companyId
			});

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}	
	};
}
export default ReportsController;