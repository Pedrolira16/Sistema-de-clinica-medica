import *  as yup from 'yup';
import moment from 'moment';

const dashboardSchema = {
	list: {
		query: yup
			.object({
				start_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD', true).isValid()).nullable(),
				end_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD', true).isValid()).nullable(),
			})
			.noUnknown()
	},
}
export default dashboardSchema;