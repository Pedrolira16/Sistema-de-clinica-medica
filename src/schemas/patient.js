import * as yup from 'yup';

const patientSchema = {
	create: {
		body: yup
			.object({
				name: yup.string().required(),
				cpf: yup.string().required(),
				email: yup.string().email().required()
			}
			)
			.unknown()
	},

	list: {
		params: yup
			.object({
				id: yup.number().required()
			})
			.unknown()
	}
}
export default patientSchema;