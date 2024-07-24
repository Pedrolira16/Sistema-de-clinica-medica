import { Attendance, Patient } from "../models";
import getDateRangeFilter from "../utils/filter-date";
import { Op } from "sequelize";

class DashboardService {
	getWhereConditions(filter, type) {
		const where = {
			company_id: filter.company_id,
			is_deleted: false
		}

		if (filter.start_date || filter.end_date) {
			where[Op.and] = getDateRangeFilter({
				start_date: filter.start_date,
				end_date: filter.end_date,
				column: type === 'attendance' ? 'start_date' : 'created_at'
			});
		}

		return where;
	};

	async list(filter) {
		const promises = [
			Attendance.count({
				where: this.getWhereConditions(filter, 'attendance')
			}),
			Patient.count({
				where: this.getWhereConditions(filter, 'patient')
			})
		];

		const [attendances, patients] = await Promise.all(promises);

		return {
			attendances,
			patients
		};
	};
}
export default DashboardService;