import BaseModel from './base.js';

export default class Patient extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			company_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			cpf: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
			{
				sequelize,
				timestamps: true,
				modelName: 'patient',
				tableName: 'patient',
				createdAt: 'created_at',
				updatedAt: 'updated_at',
			});
	}

	static associate(models) {
		this.hasMany(models.Appointment, { foreignKey: 'patient_id' });
	}
}