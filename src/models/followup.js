'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FollowUp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            FollowUp.belongsTo(models.User, { foreignKey: 'patientId' })
            FollowUp.belongsTo(models.Booking, { foreignKey: 'token', targetKey: 'token', as: 'followupData' });

        }
    };
    FollowUp.init({
        patientEmail: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        reason: DataTypes.STRING,
        result: DataTypes.STRING,
        token: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'FollowUp',
    });
    return FollowUp;
};