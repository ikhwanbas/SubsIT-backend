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
      primaryKey: true
    },
    card_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    card_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    card_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    card_valid: {
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