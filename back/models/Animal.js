import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Animal extends Model {}

Animal.init(
  {
    nom: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    race: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    couleur: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.ENUM,
      values: ['Mâle', 'Femelle', 'Inconnu'],
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statut: {
      type: DataTypes.ENUM,
      values: ['En refuge', 'Accueilli', 'Adopté'],
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'animal',
  },
);

export { Animal };

/**
 * A Animal
 * @typedef  {object} Animal
 * @property {string} id.required - Identifiant
 * @property {string} nom.required - Nom
 * @property {string} race - Race
 * @property {string} couleur - Couleur
 * @property {number} age - Age
 * @property {string} sexe - Enum sexe
 * @property {string} description - Description
 * @property {string} statut - Enum statut
 */
