import { Company } from "../models";
import { User } from "../models";
import { hashPassword } from "../utils/auth";

class CompanyService {
	async create(data){

			const {company_name, ...userData} = data

			const company = await Company.create({name: company_name});

			userData.password == hashPassword(userData.password) 
			userData.company_id= company.id
			userData.is_adm = true

			const user =  await User.create(userData)

			return{
				user,
				company
			}
	};
}
export default CompanyService;
