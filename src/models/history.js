'use strict';
const { STRING } = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {

        static associate(models) {
            History.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctor' })
            History.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timebooking' })


        }
    };
    History.init({

        patientId: DataTypes.INTEGER,
        doctorId: DataTypes.INTEGER,
        result: DataTypes.TEXT,
        files: DataTypes.TEXT,
        reason: DataTypes.STRING,
        timeType: DataTypes.STRING,
        date: DataTypes.STRING,
        patientEmail: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};