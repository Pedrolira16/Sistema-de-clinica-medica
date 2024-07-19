import * as yup from 'yup';

const placesSchema = {
	create: {
		body: yup
		.object({
			name: yup.string().required(),
			address: yup.string().required(),
			prefix: yup.string().required(),
		})
		.unknown()
	},

	list: {
		query: yup
		.object({
			search_text: yup.string().nullable(),
			page: yup.number().integer().nullable(),
		})
		.unknown()
	},

	find: {
		params: yup
		.object({
			id: yup.number().required(),
		})
		.unknown()
	},

	update: {
		params: yup
		.object({
			id: yup.number().required(),
		}),
		body: yup
		.object({
			name: yup.string(),
			address: yup.string(),
			prefix: yup.string(),
		})
		.unknown()
	},

	remove: {
		params: yup
		.object({
			id: yup.number().required(),
		})
		.unknown()
	}
}
export default placesSchema;