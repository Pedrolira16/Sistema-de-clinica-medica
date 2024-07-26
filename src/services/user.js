import { User } from "../models";
import AuthUtils, { hashPassword } from "../utils/auth";
import { validateCPF } from "../utils/auth.js";
import PaginationUtils from "../utils/pagination.js";
import { Op, literal } from "sequelize";

class UserService {
	async create(data) {
		data.password = await hashPassword(data.password);

		if (!validateCPF(data.cpf)) {
			throw new Error('CPF inválido');
		}

		const newUser = await User.create(data);

		return newUser;
	};

	async login(post) {
		console.log(post);
		const user = await User.findOne({
			where: {
				email: post.email
			}
		});

		if (!user) {
			throw new Error('Email ou senha inválidos');
		}

		const isPasswordValid = await AuthUtils.isPasswordValid(post.password, user.password);

		if (!isPasswordValid) {
			throw new Error('Email ou senha inválidos');
		}

		const token = AuthUtils.generateToken({ id: user.id, company_id: user.company_id, is_adm: user.is_adm });

		return {
			user,
			token
		};
	};

	async update(post) {
	
		if (post.password) {
			post.password = await hashPassword(post.password);
		}

		if (post.cpf && !validateCPF(post.cpf)) {
			throw new Error('CPF inválido');
		}

		return User.update(post, {
			where: {
				id: post.user_id,
				company_id: post.company_id,
				is_deleted: false
			}
		});
	};

	getWhereConditions(filter) {
		const where = {
			company_id: filter.company_id,
			is_deleted: false
		};

		if (filter.search_text) {
			where[Op.or] = [
				{ name: literal(`"user"."name" ILIKE :search_text`) },
				{ role: literal(`"user"."role" ILIKE :search_text`) }
			]
		}
		return where;
	}

	async list(filter) {

		const pagination = PaginationUtils.config({ page: filter.page, items_per_page: 10 });

		const promises = [];

		promises.push(
			User.findAll({
				where: this.getWhereConditions(filter),
				attributes: [
					'id', 
					'name', 
					'email',
					'cpf',
					'phone',
					'role',
					'is_adm'
				],
				replacements: {
					search_text: `%${filter.search_text}%`
				},
				...pagination.getQueryParams()
			})
		);

		const isFirstPage = pagination.getPage() === 1;

		if (isFirstPage) {
			promises.push(
				User.count({
					where: this.getWhereConditions(filter),
					replacements: {
						search_text: `%${filter.search_text}%`
					},
				})
			);
		}

		const [users, total] = await Promise.all(promises);

		return {
			...pagination.mount(total),
			users
		};
	};

	async find(filter) {
		return User.findOne({
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		});
	};
};
export default UserService;