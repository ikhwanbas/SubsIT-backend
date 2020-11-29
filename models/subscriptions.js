'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.services)
      this.belongsTo(models.users)
      this.belongsTo(models.cards)
    }
  };
  subscriptions.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
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
    payment: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: true,
      }
    }
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'subscriptions',
    underscored: false
  });
  return subscriptions;
};