import * as yup from 'yup';

const companySchema = {
	create: {
		body: yup
			.object({
				name: yup.string().required(),
				password: yup.string().required(),
			})
			.noUnknown(),
	}
}
export default companySchema;