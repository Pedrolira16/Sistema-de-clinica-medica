import * as yup from 'yup';

const createPatientBodySchema = yup
	.object({
		name: yup.string().required(),
		cpf: yup.string().required(),
		email: yup.string().email().required()
	}
	)
	.noUnknown()

const patientSchema = {
	create: {
		body: createPatientBodySchema
	},

	list: {
		query: yup
			.object({
				search_text: yup.string().nullable(),
				page: yup.number().integer().min(1)
			})
			.noUnknown()
	},

	find: {
		params: yup
			.object({
				id: yup.number().required()
			})
			.noUnknown()
	},

	update: {
		params: yup
			.object({
				id: yup.number().required()
			}),
		body: createPatientBodySchema
	},

	remove: {
		params: yup
			.object({
				id: yup.number().required()
			})
			.noUnknown()
	}
}
export default patientSchema;