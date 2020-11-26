'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users)
      this.belongsTo(models.cards)
    }
  };
  expenses.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'expenses',
  });
  return expenses;
};