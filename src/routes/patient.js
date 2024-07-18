import BaseRoutes from "./base";
import SchemaValidator from "../utils/schemaValidator";
import patientSchema from "../schemas/patient";
import PatientController from "../controller/patient";
import Authenticator from "../middlewares/auth";
 
class PatientRoutes extends BaseRoutes {
	constructor() {
		super();
		this.patientController = new PatientController();
	}

	setup(){
		this.router.post('/', Authenticator.getToken,SchemaValidator.validate(patientSchema.create),this.patientController.create);
		this.router.get('/', Authenticator.getToken,SchemaValidator.validate(patientSchema.list) ,this.patientController.list);
		this.router.get('/:id', Authenticator.getToken,SchemaValidator.validate(patientSchema.find),this.patientController.find);

		return this.router;
	}
}
export default PatientRoutes;