import BaseController from './base';
import UserService from '../services/user';
class UserController extends BaseController {
	constructor() {

		super();
		this.userService = new UserService();
		this.bindActions([
			'create',
			'login',
			'update',
			'list',
			'find'
		]);	
	}
	
	async create(req, res) {
		try {
			const response = await this.userService.create({
				...req.data,
				company_id: req.companyId
			}) 
	
			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async login(req, res) {
		try{
			const response = await this.userService.login({
				...req.data
			})

			this.successHandler(response,res);
		}catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async update(req, res) {
		try {
			await this.userService.update({
				...req.data,
				company_id: req.companyId,
				user_id: req.userId
			});
	
			this.successHandler(true, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async list(req, res) {
		try {
			const response = await this.userService.list({
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
			const response = await this.userService.find({
				...req.filter,
				company_id: req.companyId
			});

			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
export default UserController;