import { Op, literal } from "sequelize";
import { Patient } from "../models";
import PaginationUtils from "../utils/pagination.js";
import { createReplacements } from "../utils/utils.js";

class PatientService {
	async create(data) {
		return Patient.create(data);
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
				replacements: createReplacements(filter),
				...pagination.getQueryParams()
			})
		);
		
		const isFirstPage = pagination.getPage() === 1;

		if (isFirstPage) {
			promises.push(
				Patient.count({
					where: this.getWhereConditions(filter),
					replacements: createReplacements(filter)
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

	async update(filter, changes) {
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

		return Patient.update(changes, {
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		});
	};

	remove(filter) {
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