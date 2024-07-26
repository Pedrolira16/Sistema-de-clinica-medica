import BaseController from "./base";
import CompanyService from "../services/company";

 class CompanyController extends BaseController {
	constructor() {
		super();
		this.companyService = new CompanyService();

		this.bindActions(['create']);
	}

	async create(req, res) {
		try {
			const response = await this.companyService.create({
				...req.data,
			});
			
			this.successHandler(response, res);
			
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
export default CompanyController;