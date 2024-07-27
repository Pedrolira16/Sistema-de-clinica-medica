import * as yup from 'yup';
import { validateCPF } from '../utils/auth';

export default {
	create: {
		body: yup
			.object({
				company_name: yup.string().required(),
				name: yup.string().required(),
				email: yup.string().email().required(),
				cpf: yup.string().test('Error ao criar usuario',validateCPF),
				password: yup.string().required(),
				phone: yup.string().required(),
				role: yup.string().oneOf(['doctor', 'receptionist']).required(),
			})
			.noUnknown(),
	}
}
