import * as yup from 'yup';

const userSchema =  {
	 create : {
		body: yup
		.object ({
			name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().required(),
			cpf : yup.string().required(),
			phone: yup.string().required(),
			role: yup.string().required(),
			is_adm: yup.boolean().required(),
		})
		.noUnknown()
	 },

	 login : {
		body: yup
		.object ({
			email: yup.string().email().required(),
			password: yup.string().required()
		})
		.noUnknown()
	 },

	 update : {
		body: yup
		.object ({
			name: yup.string(),
			email: yup.string().email(),
			password: yup.string(),
			cpf : yup.string(),
			phone: yup.string(),
			role: yup.string()
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
			id: yup.number().required()
		})
		.noUnknown()
	},
}
export default userSchema;