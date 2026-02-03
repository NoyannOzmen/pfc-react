import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Tag extends Model {}

Tag.init(
  {
    nom: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'tag',
  },
);

export { Tag };

/**
 * A Tag
 * @typedef  {object} Tag
 * @property {string} id.required - Identifiant
 * @property {string} nom.required - Nom
 * @property {string} description - Description
 */
