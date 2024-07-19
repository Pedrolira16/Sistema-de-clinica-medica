import { Local,Company } from "../models";

class PlacesService {
	async create(post){
		const company = await Company.findOne({
			where: {
				id: post.company_id
			}
		});

		if(!company){
			throw new Error('Empresa não encontrada');
		}
	
		return Local.create(post);
	};
}
export default PlacesService;