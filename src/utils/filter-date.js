import moment from 'moment';
import { Op } from 'sequelize';

const getDateRangeFilter = ({
	start_date,
	end_date
}) => {
	const startDateFormated = moment(start_date).startOf('day').toISOString();
	const endDateFormated = moment(end_date).endOf('day').toISOString();

	if (start_date && end_date) {
		return {
			start_date: {
				[Op.between]: [startDateFormated, endDateFormated]
			}
		}
	}

	if (start_date && !end_date) {
		return {
			start_date: {
				[Op.gte]: startDateFormated
			}
		}
	}

	if (!start_date && end_date) {
		return {
			start_date: {
				[Op.lte]: endDateFormated
			}
		}
	}

	return {};
};
export default getDateRangeFilter;