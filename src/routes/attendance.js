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
		this.router.post('/', SchemaValidator.validate(attendanceSchema.create), this.attendanceController.create);
		this.router.get('/', SchemaValidator.validate(attendanceSchema.list), this.attendanceController.list);
		this.router.get('/:id', SchemaValidator.validate(attendanceSchema.find), this.attendanceController.find);
		this.router.put('/:id', SchemaValidator.validate(attendanceSchema.update), this.attendanceController.update);
		this.router.delete('/:id', SchemaValidator.validate(attendanceSchema.remove), this.attendanceController.remove);
		this.router.put('/:id/done', SchemaValidator.validate(attendanceSchema.done), this.attendanceController.done);
		this.router.put('/:id/confirm', SchemaValidator.validate(attendanceSchema.confirm), this.attendanceController.confirm);

		return this.router;
	}
}
export default AttendanceRoutes;