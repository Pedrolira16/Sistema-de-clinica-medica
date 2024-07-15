import * as yup from 'yup';

const companySchema = {
	create: {
		body: yup
			.object({
				name: yup.string().required()
			})
			.unknown(),
	}
	
}

export default companySchema;