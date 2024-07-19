import BaseRoutes from "./base";
import SchemaValidator from "../utils/schemaValidator";
import placesSchema from "../schemas/places";
import Authenticator from "../middlewares/auth";
import PlacesController from "../controller/places";

class PlacesRoutes extends BaseRoutes {
	constructor() {
		super();
		this.placesController = new PlacesController();
	}

	setup(){
		this.router.post('/', Authenticator.getToken ,SchemaValidator.validate(placesSchema.create), this.placesController.create);
		this.router.get('/', Authenticator.getToken, SchemaValidator.validate(placesSchema.list), this.placesController.list)

		return this.router;
	}
}
export default PlacesRoutes;