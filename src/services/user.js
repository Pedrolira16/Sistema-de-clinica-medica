import { User } from '../models';
import { hashPassword } from "../utils/auth.js";
import { validateCPF } from "../utils/auth.js";

class UserService{
	async create (post){

		post.password = await hashPassword(post.password);
		
		if(!validateCPF(post.cpf)){
			throw new Error('CPF inválido');
		}

		const newUser= await User.create(post);
		return newUser;
	};
}
export default UserService;