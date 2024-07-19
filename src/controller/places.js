import BaseController from "./base";
import PlacesService from "../services/places";

class PlacesController extends BaseController {
	constructor() {
		super();
		this.placesService = new PlacesService();
		this.bindActions(['create','list']);
	}

	async create(req, res){
		try {
			const response = await this.placesService.create({
				...req.data,
				company_id: req.companyId
			});
			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}	
	};

	async list (req, res){
		try {
			const response = await this.placesService.list({
				...req.filter,
				company_id: req.companyId
			});
			this.successHandler(response, res);
		} catch (error){
			this.errorHandler(error, req, res);
		}
	}
}
export default PlacesController;