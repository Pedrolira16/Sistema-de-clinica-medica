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
		this.router.post('/', Authenticator.getToken, SchemaValidator.validate(patientSchema.create), this.patientController.create);
		this.router.get('/', Authenticator.getToken, SchemaValidator.validate(patientSchema.list) , this.patientController.list);
		this.router.get('/:id', Authenticator.getToken, SchemaValidator.validate(patientSchema.find), this.patientController.find);
		this.router.put('/:id', Authenticator.getToken, SchemaValidator.validate(patientSchema.update), this.patientController.update);
		this.router.delete('/:id', Authenticator.getToken, SchemaValidator.validate(patientSchema.remove), this.patientController.remove)
		
		return this.router;
	}
}
export default PatientRoutes;