import { User } from '../models';
import { hashPassword } from "../utils/auth.js";

class UserService{
	async create (post){

		post.password = await hashPassword(post.password);
		const newUser= await User.create(post);
		return newUser;
	};
}
export default UserService;