import BaseModel from "./base";

export default class Appointment extends BaseModel {
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

			local_id: {
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
			},
			
			confirmed_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			
			finished_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},

			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},

			sequelize,
			timestamps: true,
			modelName: 'appointment',
			tableName: 'appointment',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		});
	}

	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
		this.belongsTo(models.Local, { foreignKey: 'local_id' });
		this.belongsTo(models.Patient, { foreignKey: 'patient_id' });
	}
}