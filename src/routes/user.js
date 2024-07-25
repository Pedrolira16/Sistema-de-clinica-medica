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
		this.router.post('/',Authenticator.verifyToken, Authenticator.adminAuth, SchemaValidator.validate(userSchema.create),this.userController.create);
		this.router.post('/:id/login',SchemaValidator.validate(userSchema.login),this.userController.login);
		this.router.put('/',Authenticator.verifyToken,SchemaValidator.validate(userSchema.update),this.userController.update);
		this.router.get('/', Authenticator.verifyToken ,SchemaValidator.validate(userSchema.list),this.userController.list);
		this.router.get('/:id', Authenticator.verifyToken ,SchemaValidator.validate(userSchema.find),this.userController.find);

		return this.router;
	}
}
export default UserRoutes;