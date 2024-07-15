import BaseModel from "./base";

export default class User extends BaseModel {
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

			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			cpf: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			role: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			is_adm: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},

			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},

			sequelize,
			timestamps: true,
			modelName: "user",
			tableName: "user",
			createdAt: "created_at",
			updatedAt: "updated_at",
		});
	}
	
	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: "company_id" });
		this.hasMany(models.Appointment, { foreignKey: "user_id" });
	}
}