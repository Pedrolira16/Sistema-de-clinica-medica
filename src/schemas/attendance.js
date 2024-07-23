import moment from 'moment';
import * as yup from 'yup';

const attendanceSchema = {
	create: {
		body: yup
			.object({
				user_id: yup.number().required(),
				place_id: yup.number().required(),
				patient_id: yup.number().required(),
				startDate: yup.date(),
				endDate: yup.date(),
			})
			.unknown()
	},

	list: {
		query: yup
			.object({
				page: yup.number().required(),
				search_text: yup.string().nullable(),
				start_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD', true).isValid()).nullable(),
				end_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD', true).isValid()).nullable(),
			})
			.unknown()
	},

	find: {
		params: yup
			.object({
				id: yup.number().required()
			})
			.unknown()
	},

	update: {
		params: yup
			.object({
				id: yup.number().required()
			})
			.unknown(),

		body: yup
			.object({
				user_id: yup.number(),
				place_id: yup.number(),
				patient_id: yup.number(),
				startDate: yup.date(),
				endDate: yup.date()
			})
			.unknown()
	}
}
export default attendanceSchema;