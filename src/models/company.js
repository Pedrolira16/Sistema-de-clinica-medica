import BaseModel from './base.js';

export default class Company extends BaseModel {
	static load(sequelize, Datatypes) {
		return super.init({
			id: {
				type: Datatypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Datatypes.STRING,
				allowNull: false
			},
			is_deleted: {
				type: Datatypes.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
		},
			{
				sequelize,
				timestamps: true,
				modalName: 'company',
				tableName: 'companies',
				createdAt: 'created_at',
				updatedAt: 'updated_at'

			});
	}
	static associate(models) {
		this.hasMany(models.User, { foreignKey: 'company_id' });
		this.hasMany(models.Place, { foreignKey: 'company_id' });
		this.hasMany(models.Attendance, { foreignKey: 'company_id' });
	}
}