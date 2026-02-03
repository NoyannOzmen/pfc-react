import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Animal_Tag extends Model {}

Animal_Tag.init(
  {
    animal_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: 'animal_tag',
  },
);

export { Animal_Tag };
