import BaseController from "./base";
import AttendanceService from "../services/attendance";

class AttendanceController extends BaseController {
	constructor() {
		super();
		this.attendanceService = new AttendanceService();
		this.bindActions([
			'create', 
			'list', 
			'find', 
			'update', 
			'remove', 
			'done',
			'confirm'
		]);
	}

	async create(req, res) {
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
			this.errorHandler(error, req, res);
		}
	};

	async find(req, res) {
		try {
			const response = await this.attendanceService.find({
				...req.filter,
				company_id: req.companyId
			});

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}

	};

	async update(req, res) {
		try {
			await this.attendanceService.update({
				...req.filter,
				company_id: req.companyId
			},
				req.data
			);

			this.successHandler(true, res)
		} catch (error) {
			this.errorHandler(error, req, res)
		}
	};

	async remove(req, res) {
		try {
			const response = await this.attendanceService.remove({
				...req.filter,
				company_id: companyId
			});

			this.successHandler(response, res)
		} catch (error) {
			this.errorHandler(error, req, res)
		}
	};

	async done(req, res) {
		try {
			await this.attendanceService.done({
				...req.filter,
				company_id: req.companyId
			});

			this.successHandler(true, res)
		} catch (error) {
			this.errorHandler(error, req, res)
		}
	};

	async confirm(req, res) {
		try {
			await this.attendanceService.confirm({
				...req.filter,
				company_id: req.companyId,
				user_id: req.userId
			});

			this.successHandler(true, res)
		} catch (error) {
			this.errorHandler(error, req, res)
		}
	};
}
export default AttendanceController;