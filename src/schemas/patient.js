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
			.noUnknown()
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
		body: yup
			.object({
				name: yup.string(),
				cpf: yup.string(),
				email: yup.string().email()		
			})
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