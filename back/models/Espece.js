import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Espece extends Model {}

Espece.init(
  {
    nom: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'espece',
  },
);

export { Espece };

/**
 * A Espece
 * @typedef  {object} Espece
 * @property {string} id.required - Identifiant
 * @property {string} nom.required - Nom
 */
