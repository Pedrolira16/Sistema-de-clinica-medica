import BaseRoutes from "./base";
import SchemaValidator from "../utils/schemaValidator";
import attendanceSchema from "../schemas/attendance";
import Authenticator from "../middlewares/auth";
import AttendanceController from "../controller/attendance";


class AttendanceRoutes extends BaseRoutes {
	constructor() {
		super();
		this.attendanceController = new AttendanceController();
	};

	setup() {
		this.router.post('/', Authenticator.getToken, SchemaValidator.validate(attendanceSchema.create), this.attendanceController.create);
		this.router.get('/', Authenticator.getToken, SchemaValidator.validate(attendanceSchema.list), this.attendanceController.list);
		this.router.get('/:id', Authenticator.getToken, SchemaValidator.validate(attendanceSchema.find), this.attendanceController.find);
		this.router.put('/:id', Authenticator.getToken, SchemaValidator.validate(attendanceSchema.update), this.attendanceController.update);

		return this.router;
	}
}
export default AttendanceRoutes;
