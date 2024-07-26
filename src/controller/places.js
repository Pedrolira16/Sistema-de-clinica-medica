import BaseController from "./base";
import PlacesService from "../services/places";

class PlacesController extends BaseController {
	constructor() {
		super();
		this.placesService = new PlacesService();
		this.bindActions([
			'create',
			'list',
			'find',
			'update',
			'remove'
		]);
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
	};
	
	async find (req, res){
		try{
			const response = await this.placesService.find({
				...req.filter,
				company_id: req.companyId
			});
			
			this.successHandler(response, res);
		}catch (error){
			this.errorHandler(error, req, res);
		}
	};

	async update (req, res){
		try{
			const response = await this.placesService.update({
				...req.data,
				company_id: req.companyId,
				id: req.params.id
			});

			this.successHandler(response, res);
		}catch (error){
			this.errorHandler(error, req, res);
		}
	};

	async remove(req, res){
		try{
			const response = await this.placesService.remove({
				...req.filter,
				company_id: req.companyId
			})

			this.successHandler(response, res);
		}catch (error){
			this.errorHandler(error, req, res);
		}
	}
};
export default PlacesController;