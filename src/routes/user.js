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
		this.router.post('/',SchemaValidator.validate(userSchema.create),this.userController.create);

		return this.router;
	}
}
export default UserRoutes;