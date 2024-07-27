import { User } from "../models";
import AuthUtils, { hashPassword } from "../utils/auth";
import PaginationUtils from "../utils/pagination.js";
import { literal } from "sequelize";
import { createReplacements } from "../utils/utils.js";


class UserService {
	 create(data) {
		data.password = hashPassword(data.password);
		return User.create(data);
	};

	async login(post) {
		const user = await User.findOne({
			where: {
				email: post.email
			}
		});

		if (!user) {
			throw new Error('Email ou senha inválidos');
		}

		const isPasswordValid = AuthUtils.isPasswordValid(post.password, user.password);

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
			post.password = hashPassword(post.password);
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
			where.name= literal(`"user"."name" ILIKE :search_text`)
		}

		if (filter.role){
			where.role= literal(`"user"."role" ILIKE :role`)
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
				replacements: createReplacements(filter),
				...pagination.getQueryParams()
			})
		);

		const isFirstPage = pagination.getPage() === 1;

		if (isFirstPage) {
			promises.push(
				User.count({
					where: this.getWhereConditions(filter),
					replacements: createReplacements(filter),
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