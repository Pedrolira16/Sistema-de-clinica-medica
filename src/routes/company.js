import BaseRoutes from "./base";
import SchemaValidator from "../utils/schemaValidator";
import companySchema from "../schemas/company";
import CompanyController from "../controller/company";

class CompanyRoutes extends BaseRoutes {
	constructor() {
		super();
		this.companyController = new CompanyController();
	}

	setup(){
		this.router.post('/register', SchemaValidator.validate(companySchema.create), this.companyController.create);

		return this.router;

	}

}export default CompanyRoutes;