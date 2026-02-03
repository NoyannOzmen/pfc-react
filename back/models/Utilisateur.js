import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Utilisateur extends Model {}

Utilisateur.init(
  {
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mot_de_passe: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'utilisateur',
  },
);

export { Utilisateur };

/**
 * A Utilisateur
 * @typedef  {object} Utilisateur
 * @property {string} id.required - Identifiant
 * @property {string} email.required - Adresse email
 * @property {string} mot_de_passe.required- Mot de passe
 */
