import { Router } from 'express';
import SchemaValidator from '../utils/schemaValidator';

class BaseRoutes {
	
	constructor() {
		this.router = new Router();
		this.SchemaValidator = SchemaValidator;
	}
}
export default BaseRoutes;