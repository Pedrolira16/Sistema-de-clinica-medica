import BaseModel from './base';

export default class Attendance extends BaseModel {
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

			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			place_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			patient_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			start_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},

			end_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},

			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'SCHEDULED',
			},

			confirmed_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},

			finished_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			
			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			}
		},
			{
				sequelize,
				timestamps: true,
				modelName: 'attendance',
				tableName: 'attendances',
				createdAt: 'created_at',
				updatedAt: 'updated_at',
			});
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id' });
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
		this.belongsTo(models.Place, { foreignKey: 'place_id' });
		this.belongsTo(models.Patient, { foreignKey: 'patient_id' });
	}
}
