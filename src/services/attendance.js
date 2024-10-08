import { User, Place, Attendance, Patient } from '../models';
import PaginationUtils from '../utils/pagination';
import { Op, literal, Sequelize } from 'sequelize';
import getDateRangeFilter from '../utils/filter-date';
import { createReplacements } from '../utils/utils';

class AttendanceService {
	async create(data) {
		const [user, patient, place] = await Promise.all([
			User.findOne({
				where: {
					id: data.user_id,
					is_deleted: false,
					company_id: data.company_id
				}
			}),
			Patient.findOne({
				where: {
					id: data.patient_id,
					is_deleted: false,
					company_id: data.company_id
				}
			}),
			Place.findOne({
				where: {
					id: data.place_id,
					is_deleted: false,
					company_id: data.company_id
				}
			})
		]);
		
		if (!user||!patient||!place) {
			throw new Error('not found');
		}
		
		await User.increment('total_attendances', {
			where: {
				id: data.user_id,
				is_deleted: false
			},
			by: 1
		});

		return Attendance.create(data);
	};

	whereConditions(filter) {
		const where = {
			company_id: filter.company_id,
			is_deleted: false
		};
		
		if (filter.id_text) {
			where[Op.or] = [
				{ name: literal(`"user"."id" = :id_text`) },
				{ place: literal(`"place"."id" = :id_text`) }
			];
		}

		if (filter.start_date || filter.end_date) {
			where[Op.and] = getDateRangeFilter({
				start_date: filter.start_date,
				end_date: filter.end_date,
			});
		}

		return where;
	};

	async list(filter) {
		const pagination = PaginationUtils.config({ page: filter.page, items_per_page: 10 });

		const promises = [];

		promises.push(
			Attendance.findAll({
				where: this.whereConditions(filter),
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['id', 'name']
					},
					{
						model: Patient,
						as: 'patient',
						attributes: ['id', 'name']
					},
					{
						model: Place,
						as: 'place',
						attributes: ['id', 'name']
					},
				],
				attributes: [
					'status',
					'start_date',
					'end_date'
				],
				replacements: {
					...createReplacements(filter),
					id_text: filter.id_text
				},
				raw: true,
				nest: true,
				...pagination.getQueryParams()
			})
		);

		const isFirstPage = pagination.getPage() === 1;

		if (isFirstPage) {
			promises.push(
				Attendance.count({
					where: this.whereConditions(filter),
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name']
						},
						{
							model: Patient,
							as: 'patient',
							attributes: ['id', 'name']
						},
						{
							model: Place,
							as: 'place',
							attributes: ['id', 'name']
						},
					],
					replacements: {
						...createReplacements(filter),
						id_text: filter.id_text
					},
				}),
			);
		}
		const [attendances, totalItems] = await Promise.all(promises);

		return {
			attendances,
			...pagination.mount(totalItems)
		}
	};

	async find(filter) {
		const promises = [];

		promises.push(
			Attendance.findOne({
				where: this.whereConditions(filter),
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['id', 'name']
					},
					{
						model: Patient,
						as: 'patient',
						attributes: ['id', 'name']
					},
					{
						model: Place,
						as: 'place',
						attributes: ['id', 'name']
					},
				],
				attributes: [
					'status',
					'start_date',
					'end_date'
				],

				replacements: createReplacements(filter),
				raw: true,
				nest: true,

			}),
		)

		const attendance = await Promise.all(promises)

		return attendance;
	};

	async update(filter, data) {
		return Attendance.update(data, {
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		});
	};

	async remove(filter) {
		return Attendance.update({
			is_deleted: true
		},
			{
				where: {
					id: filter.id,
					company_id: filter.company_id,
					is_deleted: false
				}
			});
	};

	async done(filter) {
		return Attendance.update({
			finished_at: Sequelize.literal('NOW()'),
			status: 'DONE'
		},
			{
				where: {
					id: filter.id,
					company_id: filter.company_id,
					is_deleted: false
				}
			});
	};

	async confirm(filter){
		return Attendance.update({
			confirmed_at: Sequelize.literal('NOW()'),
			confirmed_by: filter.user_id,
			status: 'CONFIRMED',

		},
		{
			where: {
				id: filter.id,
				company_id: filter.company_id,
				is_deleted: false
			}
		})
	};
}
export default AttendanceService;