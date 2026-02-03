import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Media extends Model {}

Media.init(
  {
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ordre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'media',
  },
);

export { Media };

/**
 * A Tag
 * @typedef  {object} Media
 * @property {string} id.required - Identifiant
 * @property {string} url.required - Photo principale
 * @property {string} ordre.required - Ordre d'affichage
 */
