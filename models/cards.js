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
      this.hasMany(models.subscriptions, { foreignKey: 'cardId' })
      this.hasMany(models.expenses, { foreignKey: 'cardId' })
    }
  };
  cards.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true
      }
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true
      }
    },
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: true
      }
    },
    cardValid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    saldo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: true
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'cards',
  });
  return cards;
};