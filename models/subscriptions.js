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
      primaryKey: true
    },
    repeat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cardId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    payment: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'subscriptions',
    underscored: false
  });
  return subscriptions;
};