import BaseModel from './base';

export default class Place extends BaseModel {
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

			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			prefix: {
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
				modelName: 'place',
				tableName: 'places',
				createdAt: 'created_at',
				updatedAt: 'updated_at',
			});
	}
	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
		this.hasMany(models.Attendance, { foreignKey: 'place_id' });
	}
}