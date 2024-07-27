import * as yup from 'yup';

const paramsSchema = {
	params: yup
		.object({
			id: yup.number().required()
		})
		.noUnknown()
}

const userSchema = {
	create: {
		body: yup
			.object({
				name: yup.string().required(),
				email: yup.string().email().required(),
				password: yup.string().required(),
				cpf: yup.string().required(),
				phone: yup.string().required(),
				role: yup.string().required().oneOf(['doctor', 'receptionist']),
				is_adm: yup.boolean().required(),
			})
			.noUnknown()
	},

	login: {
		body: yup
			.object({
				email: yup.string().email().required(),
				password: yup.string().required()
			})
			.noUnknown()
	},

	update: {
		params: paramsSchema,

		body: yup
			.object({
				name: yup.string().required(),
				email: yup.string().email().required(),
				password: yup.string().required(),
				cpf: yup.string().required(),
				phone: yup.string().required(),
				role: yup.string().required().oneOf(['doctor', 'receptionist']),
			})
			.noUnknown()
	},

	list: {
		query: yup
			.object({
				search_text: yup.string().nullable(),
				role: yup.string().nullable().oneOf(['doctor', 'receptionist']),
				page: yup.number().integer().nullable(),
			})
			.noUnknown()
	},

	find: {
		params: paramsSchema
	}
	
}
export default userSchema;