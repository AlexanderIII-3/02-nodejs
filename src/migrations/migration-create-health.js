



'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('health', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },


            name: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.STRING
            },
            patientId: {
                type: Sequelize.INTEGER
            },
            height: {
                type: Sequelize.INTEGER
            },
            weight: {
                type: Sequelize.INTEGER
            },
            bmi: {
                type: Sequelize.FLOAT
            },


            bloodGroup: {
                type: Sequelize.STRING

            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            actor: {
                type: Sequelize.STRING,
                allowNull: false,


            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_general_ci'


        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('health');
    }
};