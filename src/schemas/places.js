import * as yup from 'yup';

const placesSchema = {
	create: {
		body: yup
			.object({
				name: yup.string().required(),
				address: yup.string().required(),
				prefix: yup.string().required(),
			})
	},

	list: {
		query: yup
		.object({
			search_text: yup.string().nullable(),
			page: yup.number().integer().nullable(),
		})
	}
}
export default placesSchema;