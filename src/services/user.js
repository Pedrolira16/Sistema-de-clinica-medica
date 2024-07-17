import { User, Company } from "../models";
import { hashPassword } from "../utils/auth.js";
import { validateCPF } from "../utils/auth.js";

class UserService{
	async create (post,filter){


		const company = await Company.findOne({where: {id: filter.id}});

		if(!company){
			throw new Error('Empresa não encontrada');
		}
		
		post.company_id = filter.id;
		post.password = await hashPassword(post.password);
		
		if(!validateCPF(post.cpf)){
			throw new Error('CPF inválido');
		}

		const newUser= await User.create(post);
		return newUser;
	};
}
export default UserService;