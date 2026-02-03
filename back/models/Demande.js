import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Demande extends Model {}

Demande.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    famille_id: DataTypes.INTEGER,
    animal_id: DataTypes.INTEGER,
    statut_demande: {
      type: DataTypes.ENUM,
      values: ['En attente', 'Validée', 'Refusée'],
      allowNull: false,
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'demande',
  },
);

export { Demande };
