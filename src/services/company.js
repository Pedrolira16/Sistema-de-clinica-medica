import { Company } from "../models";
import { User } from "../models";


export default class CompanyService {
	async create(post){

			const company = await Company.create(post)

			const user = await User.create({
				company_id: company.id,
				name: ' Admin '+company.id,
				email:'admin@email.com',	
				password: Math.floor(Math.random() * 900000) + 100000,
				cpf: Math.floor(Math.random() * 90000000000) + 10000000000,	
				phone: 123456789,
				role: 'doctor',
				is_adm: true
			})
			return company, user;
	};
}