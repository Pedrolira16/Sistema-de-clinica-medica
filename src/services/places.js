import { Place } from "../models";
import PaginationUtils from "../utils/pagination";
import { literal, Op } from "sequelize";
import { createReplacements } from "../utils/utils";

class PlacesService {
	async create(data) {
		return Place.create(data);
	};

	getWhereConditions(filter) {
		const where = {
			company_id: filter.company_id,
			is_deleted: false
		};

		if (filter.search_text) {
			where[Op.or] = [
				{ name: literal(`place.name ILIKE :search_text`) },
				{ prefix: literal(`place.prefix ILIKE :search_text`) }
			]
		}
		return where;
	};

	async list(filter) {
		const pagination = PaginationUtils.config({ page: filter.page, items_per_page: 10 });

		const promises = [];

		promises.push(
			Place.findAll({
				where: this.getWhereConditions(filter),
				attributes: ['name', 'address', 'prefix'],
				replacements:createReplacements(filter),
				...pagination.getQueryParams()
			})
		);

		const isFirstPage = pagination.getPage() === 1;

		if (isFirstPage) {
			promises.push(
				Place.count({
					where: this.getWhereConditions(filter),
					replacements: createReplacements(filter)
				})
			);
		}
		const [places, totalItems] = await Promise.all(promises);

		return {
			places,
			...pagination.mount(totalItems)
		}
	};

	find(filter) {
		return Place.findOne({
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			},
			attributes: ['name', 'address', 'prefix']
		})
	};

	update(data) {
		return Place.update(data, {
			where: {
				id: data.id,
				company_id: data.company_id,
				is_deleted: false
			}
		});
	};

	remove(filter) {
		return Place.update({
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