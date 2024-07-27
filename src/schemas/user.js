import * as yup from 'yup';
import { validateCPF } from '../utils/auth';

const paramsSchema = {
	params: yup
		.object({
			id: yup.number().required()
		})
		.noUnknown()
}

const createSchema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().required(),
		cpf: yup.string().test('Error ao criar usuario',validateCPF),
		phone: yup.string().required(),
		role: yup.string().required().oneOf(['doctor', 'receptionist']),
		is_adm: yup.boolean().required(),
	})
	.noUnknown()

const userSchema = {
	create: {
		body: createSchema
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

		body: createSchema
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