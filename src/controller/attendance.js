import BaseController from "./base";
import AttendanceService from "../services/attendance";

class AttendanceController extends BaseController {
	constructor() {
		super();
		this.attendanceService = new AttendanceService();
		this.bindActions(['create', 'list']);
	}

	async create(req, res) {
		console.log(req.data);
		try {
			const response = await this.attendanceService.create({
				...req.data,
				company_id: req.companyId
			});

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async list(req, res) {
		try {
			const response = await this.attendanceService.list({
				...req.filter,
				company_id: req.companyId
			});

			this.successHandler(response, res);
		} catch (error) {
			console.log(error);
			this.errorHandler(error, req, res);
		}
	};
}
export default AttendanceController;