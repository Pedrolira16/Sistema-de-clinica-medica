import BaseRoutes from "./base";
import SchemaValidator from "../utils/schemaValidator";
import userSchema from "../schemas/user";
import UserController from "../controller/user";
 

class UserRoutes extends BaseRoutes {
	constructor() {
		super();
		this.userController = new UserController();
	}

	setup(){
		this.router.post('/:id',SchemaValidator.validate(userSchema.create),this.userController.create);
		this.router.post('/:id/login',SchemaValidator.validate(userSchema.login),this.userController.login);//queria sem ter que colocar o id

		return this.router;
	}
}
export default UserRoutes;