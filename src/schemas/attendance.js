import moment from 'moment';
import * as yup from 'yup';

const attendanceCreateBodySchema = yup
	.object({
		user_id: yup.number().required(),
		place_id: yup.number().required(),
		patient_id: yup.number().required(),
		start_date: yup.string().test('invalidFormat', null, function (value) {
			return !value || (moment(value, 'YYYY-MM-DD, HH:mm', true).isValid() && moment(value).isAfter(moment()));
		}).nullable(),
		end_date: yup.string().test('invalidFormat', null, function (value) {
			const { start_date } = this.parent;
			return !value || (moment(value, 'YYYY-MM-DD, HH:mm', true).isValid() && moment(value).isAfter(moment(start_date)));
		}).nullable(),
	})
	.noUnknown()

const paramsSchema = yup
	.object({
		id: yup.number().required()
	})
	.noUnknown()

const attendanceSchema = {
	create: {
		body: attendanceCreateBodySchema
	},

	list: {
		query: yup
			.object({
				page: yup.number().required(),
				id_text: yup.number().nullable(),
				start_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD', true).isValid()).nullable(),
				end_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD', true).isValid()).nullable(),
			})
			.noUnknown()
	},

	find: {
		params: paramsSchema
	},

	update: {
		params: paramsSchema,
		body: attendanceCreateBodySchema
	},

	remove: {
		params: yup
			.object({
				id: yup.number().required()
			})
			.noUnknown(),
	},

	done: {
		params: paramsSchema
	},

	confirm: {
		params: paramsSchema
	}
}
export default attendanceSchema;