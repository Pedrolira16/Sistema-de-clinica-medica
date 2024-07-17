import { Company, Patient, User } from "../models";
import { validateCPF } from "../utils/auth.js";

class PatientService {
	async create(post, filter) {
		const user = await User.findOne({
			where: {
				id: filter
			}
		});

		const company = await Company.findOne({
			where: {
				id: user.company_id
			}
		});

		if (!company) {
			throw new Error('Empresa não encontrada');
		}

		post.company_id = company.id

		if (!validateCPF(post.cpf)) {
			throw new Error('CPF inválido');
		}

		return Patient.create(post);
	};

	async list(filter) {
		const user = await User.findOne({
			where: {
				id: filter
			}
		});
		return Patient.findAll({
			where: {
				company_id: user.company_id
			}
		});
	};

	async getOne(userId,filter) {
		const user = await User.findOne({
			where: {
				id: userId
			}
		});
		return Patient.findOne({
			where: {
				id: filter.id,
				company_id: user.company_id
			}
		});
	}
}
export default PatientService;