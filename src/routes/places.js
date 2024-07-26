import BaseRoutes from "./base";
import SchemaValidator from "../utils/schemaValidator";
import placesSchema from "../schemas/places";
import PlacesController from "../controller/places";

class PlacesRoutes extends BaseRoutes {
	constructor() {
		super();
		this.placesController = new PlacesController();
	}

	setup(){
		this.router.post('/', SchemaValidator.validate(placesSchema.create), this.placesController.create);
		this.router.get('/',  SchemaValidator.validate(placesSchema.list), this.placesController.list);
		this.router.get('/:id',  SchemaValidator.validate(placesSchema.find), this.placesController.find);
		this.router.put('/:id',  SchemaValidator.validate(placesSchema.update), this.placesController.update);
		this.router.delete('/:id',  SchemaValidator.validate(placesSchema.remove),this.placesController.remove);

		return this.router;
	}
}
export default PlacesRoutes;