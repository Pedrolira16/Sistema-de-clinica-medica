import BaseController from "./base";
import PatientService from "../services/patient";
import { log } from "handlebars/runtime";

export default class PatientController extends BaseController {

	constructor() {
		super();

		this.patientService = new PatientService();
		this.bindActions([
			'create', 
			'list', 
			'find'
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
			const response = await this.patientService.list({
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
			const response = await this.patientService.find({
				...req.filter,
				company_id: req.companyId
			});

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}