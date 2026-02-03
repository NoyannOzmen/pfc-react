import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Famille extends Model {}

Famille.init(
  {
    prenom: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nom: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rue: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commune: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code_postal: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pays: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hebergement: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    terrain: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'famille',
  },
);

export { Famille };

/**
 * A Famille
 * @typedef  {object} Famille
 * @property {string} id.required - Identifiant
 * @property {string} nom.required - Nom
 * @property {string} telephone - N° téléphone
 * @property {string} rue - Rue
 * @property {string} commune - Commune
 * @property {string} code_postal - Code Postal
 * @property {string} pays - Pays
 * @property {string} hebergement - Type d'hébergement
 */
