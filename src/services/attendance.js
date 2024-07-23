import { User, Place, Attendance, Patient } from '../models';
import PaginationUtils from '../utils/pagination';
import { Op, literal } from 'sequelize';

class AttendanceService {
	async create(data) {
		const user = await User.findOne({
			where: {
				id: data.user_id,
				is_deleted: false
			}
		});

		if (!user) {
			throw new Error('Usuário não encontrado');
		}

		const patient = await Patient.findOne({
			where: {
				id: data.patient_id,
				is_deleted: false
			}
		});

		if (!patient) {
			throw new Error('Paciente não encontrado');
		}

		const place = await Place.findOne({
			where: {
				id: data.place_id,
				is_deleted: false
			}
		});

		if (!place) {
			throw new Error('Local não encontrado');
		}

		return Attendance.create(data);
	}

	whereConditions(filter) {
		const where = {
			company_id: filter.company_id,
			is_deleted: false
		}      	                            	      	     	    	                                                    
		if (filter.search_text) {
			where[Op.or] = [
				{ name: literal(`"user"."name" ILIKE :search_text`)},
				{ place: literal(`"place"."name" ILIKE :search_text`) }
			]
		}
		return where;
	}
                                                                             
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
					search_text: `%${filter.search_text}%`
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
						search_text: `%${filter.search_text}%`
					},
				})
			);
		}
		const [attendances, totalItems] = await Promise.all(promises);

		return {
			attendances,
			...pagination.mount(totalItems)
		}
	};
}
export default AttendanceService;