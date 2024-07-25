import * as yup from 'yup';

const placesSchema = {
	create: {
		body: yup
		.object({
			name: yup.string().required(),
			address: yup.string().required(),
			prefix: yup.string().required(),
		})
		.noUnknown()
	},

	list: {
		query: yup
		.object({
			search_text: yup.string().nullable(),
			page: yup.number().integer().nullable(),
		})
		.noUnknown()
	},

	find: {
		params: yup
		.object({
			id: yup.number().required(),
		})
		.noUnknown()
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
		.noUnknown()
	},

	remove: {
		params: yup
		.object({
			id: yup.number().required(),
		})
		.noUnknown()
	}
}
export default placesSchema;