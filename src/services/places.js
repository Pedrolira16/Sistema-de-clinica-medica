import { Local } from "../models";
import PaginationUtils from "../utils/pagination";
import { literal, Op } from "sequelize";

class PlacesService {
	async create(data) {
		return Local.create(data);
	};

	getWhereConditions(filter) {
		const where = {
			company_id: filter.company_id,
			is_deleted: false
		};

		if (filter.search_text) {
			where[Op.or] = [
				{ name: literal(`local.name ILIKE :search_text`) },
				{ prefix: literal(`local.prefix ILIKE :search_text`) }
			]
		}
		return where;

	};

	async list(filter) {
		const pagination = PaginationUtils.config({ page: filter.page, items_per_page: 10 });

		const promises = [];

		promises.push(
			Local.findAll({
				where: this.getWhereConditions(filter),
				attributes: ['name', 'address', 'prefix'],
				replacements: {
					search_text: `%${filter.search_text}%`
				},
				...pagination.getQueryParams()
			})
		);

		const isFirstPage = pagination.getPage() === 1;

		if (isFirstPage) {
			promises.push(
				Local.count({
					where: this.getWhereConditions(filter),
					replacements: {
						search_text: `%${filter.search_text}%`
					},
				})
			);
		}
		const [places, totalItems] = await Promise.all(promises);

		return {
			places,
			...pagination.mount(totalItems)
		}
	};

	async find(filter) {
		return Local.findOne({
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			},
			attributes: ['name', 'address', 'prefix']
		})
	};

	async update(data) {
		return Local.update(data, {
			where: {
				id: data.id,
				company_id: data.company_id,
				is_deleted: false
			}
		});
	};

	async remove(filter) {
		return Local.update({
			is_deleted: true
		}, {
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		})
	}
}
export default PlacesService;