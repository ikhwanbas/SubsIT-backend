'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.expenses, { foreignKey: 'cardId' })
    }
  };
  categories.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    category: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'categories',
  });
  return categories;
};