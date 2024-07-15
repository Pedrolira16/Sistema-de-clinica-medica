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
			company_id: yup.number().required(),
			is_adm: yup.boolean().required(),
		})
		.unknown()
	 }
}
export default userSchema;