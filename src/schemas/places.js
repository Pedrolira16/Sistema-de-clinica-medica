import * as yup from 'yup';

const placesSchema = {
	create: {
		body: yup
			.object({
				name: yup.string().required(),
				address: yup.string().required(),
				prefix: yup.string().required(),
			})
	}	
}
export default placesSchema;