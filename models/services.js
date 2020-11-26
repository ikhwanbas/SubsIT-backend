'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.subscriptions)
      this.belongsTo(models.spendings)
    }
  };
  services.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: v4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'services',
  });
  return services;
};