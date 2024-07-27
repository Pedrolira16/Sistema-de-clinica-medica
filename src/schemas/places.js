import * as yup from 'yup';

const bodySchema = yup
	.object({
		name: yup.string().required(),
		prefix: yup.string().required(),
	})
	.noUnknown()

const paramsSchema = yup
		.object({
			id: yup.number().required()
		})
		.noUnknown()


const placesSchema = {
	create: {
		body: bodySchema
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
		params: paramsSchema
	},

	update: {
		params: paramsSchema,
		body: bodySchema
		.noUnknown()
	},

	remove: {
		params: paramsSchema
		.noUnknown()
	}
}
export default placesSchema;