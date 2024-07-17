'use strict';

const { add } = require("lodash");

module.exports = {
	up: async (queryInterface, Sequelize) => {

		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable("company", {
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

			await queryInterface.createTable("user", {
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
						model: "company",
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

			await queryInterface.createTable("patient", {
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
						model: "company",
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

			await queryInterface.createTable("local", {
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
						model: "company",
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

			await queryInterface.createTable("appointment", {
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
						model: "user",
						key: "id",
					}
				},

				company_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "company",
						key: "id",
					}
				},

				patient_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "patient",
						key: "id",
					}
				},

				local_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "local",
						key: "id",
					}
				},

				startDate: {
					type: Sequelize.DATE,
					allowNull: false,
				},

				endDate: {
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
			await queryInterface.dropTable("appointment", { transaction });
			await queryInterface.dropTable("local", { transaction });
			await queryInterface.dropTable("patient", { transaction });
			await queryInterface.dropTable("user", { transaction });
			await queryInterface.dropTable("company", { transaction });

			await transaction.commit();

		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};