import { Op, literal } from "sequelize";
import { Company, Patient, User } from "../models";
import { validateCPF } from "../utils/auth.js";
import PaginationUtils from "../utils/pagination.js";

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

	getWhereConditions(filter) {
		const where = {
			company_id: filter.company_id,
			is_deleted: false
		};

		if (filter.search_text) {
			where[Op.or] = [
				{ name: literal(`patient.name ILIKE :search_text`) },
				{ cpf: literal(`patient.cpf ILIKE :search_text`) }
			]
		}
		return where;
	}

	async list(filter) {

		const pagination = PaginationUtils.config({ page: filter.page, items_per_page: 10 });

		const promises = [];

		promises.push(
			Patient.findAll({
				where: this.getWhereConditions(filter),
				attributes: ['id', 'name', 'cpf', 'email'],
				replacements: {
					search_text: `%${filter.search_text}%`
				},
				...pagination.getQueryParams()

			})
		);
		const isFirstPage = pagination.getPage() === 1;

		if (isFirstPage) {
			promises.push(
				Patient.count({
					where: this.getWhereConditions(filter),
					replacements: {
						search_text: `%${filter.search_text}%`
					},
				})
			);
		}

		const [patients, totalItems] = await Promise.all(promises);

		return {
			...pagination.mount(totalItems),
			patients
		};
	};

	async find(filter) {
		return Patient.findOne({
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			},
			attributes: ['id', 'name', 'cpf', 'email']
		});
	};

	async update(filter, data) {

		const patient = Patient.findOne({
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		})

		if (!patient) {
			throw new Error('Paciente não encontrado')
		}

		if (data.cpf && !validateCPF(data.cpf)) {
			throw new Error('CPF inválido');
		}

		return Patient.update(data, {
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		});
	};

	async remove(filter) {
		return Patient.update({
			is_deleted: true
		}, {
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		});
	}
}
export default PatientService;