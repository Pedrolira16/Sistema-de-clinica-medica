import BaseController from './base';
import UserService from '../services/user';

export default class UserController extends BaseController {
	constructor() {

		super();
		this.userService = new UserService();
		this.bindActions(['create']);	
	}
	
	async create(req, res) {
		try {
			const filter = req.filter;
	
			const response = await this.userService.create(req.data, filter); 
	
			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}