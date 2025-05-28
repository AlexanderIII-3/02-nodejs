'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('followups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            patientEmail: {
                type: Sequelize.STRING

            },
            status: {
                type: Sequelize.BOOLEAN
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },


            reason: {

                type: Sequelize.STRING,
            },
            is_clone: {

                type: Sequelize.BOOLEAN,
            },
            token: {

                type: Sequelize.STRING,
            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('followups');
    }
};