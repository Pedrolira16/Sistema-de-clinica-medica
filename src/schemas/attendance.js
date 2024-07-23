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
	},

	list: {
		query: yup
			.object({
				page: yup.number().required(),
				search_text: yup.string().nullable(),
			})
	}
}
export default attendanceSchema;