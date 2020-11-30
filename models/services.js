'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.subscriptions, { foreignKey: 'serviceId' })
    }
  };
  services.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'services',
  });
  return services;
};