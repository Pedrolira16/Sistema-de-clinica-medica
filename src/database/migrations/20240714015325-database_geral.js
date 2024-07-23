'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {

		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable("companies", {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				is_deleted: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},

				created_at: Sequelize.DATE,
				updated_at: Sequelize.DATE

			}, { transaction });

			await queryInterface.createTable("users", {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				company_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "companies",
						key: "id",
					}
				},

				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				email: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				password: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				cpf: {
					type: Sequelize.STRING,
					allownull: false,
				},

				phone: {
					type: Sequelize.STRING,
					allownull: false,
				},

				role: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				is_adm: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},

				is_deleted: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},

				created_at: Sequelize.DATE,
				updated_at: Sequelize.DATE
				
			}, { transaction });

			await queryInterface.createTable("patients", {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				company_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "companies",
						key: "id",
					}
				},

				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				email: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				cpf: {
					type: Sequelize.STRING,
					allownull: false,
				},

				is_deleted: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},

				created_at: Sequelize.DATE,
				updated_at: Sequelize.DATE
				
			}, { transaction });

			await queryInterface.createTable("places", {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				address: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				prefix: {
					type: Sequelize.STRING,
					allowNull: false,
				},

				company_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "companies",
						key: "id",
					}
				},

				is_deleted: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},

				created_at: Sequelize.DATE,
				updated_at: Sequelize.DATE

			}, { transaction });

			await queryInterface.createTable("attendances", {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				user_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "users",
						key: "id",
					}
				},

				company_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "companies",
						key: "id",
					}
				},

				patient_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "patients",
						key: "id",
					}
				},

				place_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "places",
						key: "id",
					}
				},

				start_date: {
					type: Sequelize.DATE,
					allowNull: false,
				},

				end_date: {
					type: Sequelize.DATE,
					allowNull: false,
				},

				confirmed_at: {
					type: Sequelize.DATE,
					allowNull: true,
				},

				finished_at: {
					type: Sequelize.DATE,
					allowNull: true,
				},

				status: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: "SCHEDULED"
				},

				is_deleted: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},

				created_at: Sequelize.DATE,
				updated_at: Sequelize.DATE

			}, { transaction });

			await transaction.commit();

		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	down: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable("attendances", { transaction });
			await queryInterface.dropTable("patients", { transaction });
			await queryInterface.dropTable("places", { transaction });
			await queryInterface.dropTable("users", { transaction });
			await queryInterface.dropTable("companies", { transaction });

			await transaction.commit();

		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}; 