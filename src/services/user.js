import { User, Company } from "../models";
import AuthUtils, { hashPassword } from "../utils/auth";
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

	async login(post){
		const user = await User.findOne({where: {email: post.email}});
		
		if(!user){
			throw new Error('Email ou senha inválidos');
		}
		
		const isPasswordValid = await AuthUtils.isPasswordValid(post.password, user.password);

		if(!isPasswordValid){
			throw new Error('Email ou senha inválidos');
		}

		const token = AuthUtils.generateToken({id: user.id});

		return {
			user,
			token
		};
	}
}
export default UserService;