import { find } from 'lodash';
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
		query: yup
			.object({
				search_text: yup.string().nullable(),
				page: yup.number().integer().min(1)
			})
			.unknown()
	},		

	find: {
		params: yup
			.object({
				id: yup.number().required()
			})
			.unknown()
	}
}
export default patientSchema;