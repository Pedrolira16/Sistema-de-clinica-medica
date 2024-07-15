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
				tableName: 'company',
				createdAt: 'created_at',
				updatedAt: 'updated_at'

			});
	}
	static associate(models) {
		this.hasMany(models.User, { foreignKey: 'company_id' });
		this.hasMany(models.Local, { foreignKey: 'company_id' });
		this.hasMany(models.Appointment, { foreignKey: 'company_id' });
	}
}