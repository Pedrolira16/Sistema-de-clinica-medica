import { Company } from "../models";
import { User } from "../models";
import { hashPassword } from "../utils/auth";


export default class CompanyService {
	async create(post){

			const company = await Company.create(post)

			const passwordHash = await hashPassword(post.password);

			const user = await User.create({
				company_id: company.id,
				name: ' Admin '+company.id,
				email:'admin'+company.id+'@email.com',	
				password: passwordHash,
				cpf: Math.floor(Math.random() * 90000000000) + 10000000000,	
				phone: 123456789,
				role: 'doctor',
				is_adm: true
			});

			return company, user;
	};
}