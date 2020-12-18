'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.services, { foreignKey: 'serviceId' })
      this.belongsTo(models.users, { foreignKey: 'userId' })
      this.belongsTo(models.cards, { foreignKey: 'cardId' })
    }
  };
  subscriptions.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4(),
    },
    repeat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true,
        equals: 'Monthly'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    payment: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: true,
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true
      }
    },
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'subscriptions'
  });
  return subscriptions;
};