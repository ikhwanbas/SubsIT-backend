'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users)
      this.hasMany(models.subscriptions)
      this.hasMany(models.expenses)
    }
  };
  cards.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardValid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    saldo: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'cards',
  });
  return cards;
};