import BaseController from "./base";
import PatientService from "../services/patient";

export default class PatientController extends BaseController {

	constructor() {
		super();

		this.patientService = new PatientService();
		this.bindActions([
			'create', 
			'list', 
			'getOne'
		]);
	}

	async create(req, res) {
		try {

			const userId = req.userId

			const response = await this.patientService.create(req.data, userId);

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async list(req, res) {
		try {
			const response = await this.patientService.list(req.userId);

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async getOne(req, res) {
		try {
			const response = await this.patientService.getOne(req.userId, req.filter);

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}