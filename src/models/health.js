'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Health extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Health.belongsTo(models.User, { foreignKey: 'patientId' })

        }
    };
    Health.init({
        date: DataTypes.STRING,
        patientId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        height: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        bmi: DataTypes.FLOAT,
        bloodGroup: DataTypes.STRING,
        actor: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Health',
    });
    return Health;
};