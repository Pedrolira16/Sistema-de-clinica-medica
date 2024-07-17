import BaseRoutes from "./base";
import SchemaValidator from "../utils/schemaValidator";
import userSchema from "../schemas/user";
import UserController from "../controller/user";
import Authenticator from "../middlewares/auth";
 

class UserRoutes extends BaseRoutes {
	constructor() {
		super();
		this.userController = new UserController();
	}

	setup(){
		this.router.post('/:id',SchemaValidator.validate(userSchema.create),this.userController.create);
		this.router.post('/:id/login',SchemaValidator.validate(userSchema.login),this.userController.login);
		this.router.put('/:id',Authenticator.getToken,SchemaValidator.validate(userSchema.update),this.userController.update);
		this.router.get('/:id',SchemaValidator.validate(userSchema.list),this.userController.list);	

		return this.router;
	}
}
export default UserRoutes;