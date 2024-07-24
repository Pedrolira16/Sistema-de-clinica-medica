import { User } from "../models";

class ReportsService {
	async attendance(filter) {
		return User.findAll({
			where: {
				company_id: filter.company_id
			},
			attributes: ["id", "name", "total_attendances"],
		});
	};
}
export default ReportsService;