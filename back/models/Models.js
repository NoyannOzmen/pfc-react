import { Animal } from './Animal.js';
import { Animal_Tag } from './Animal_Tag.js';
import { Association } from './Association.js';
import { Demande } from './Demande.js';
import { Espece } from './Espece.js';
import { Famille } from './Famille.js';
import { Media } from './Media.js';
import { Tag } from './Tag.js';
import { Utilisateur } from './Utilisateur.js';

/* Relations One-to-One : Association <-> Utilisateur <-> Famille */

Utilisateur.hasOne(Association, {
  foreignKey: 'utilisateur_id',
  as: 'refuge',
});

Association.belongsTo(Utilisateur, {
  foreignKey: 'utilisateur_id',
  as: 'identifiant_association',
});

Utilisateur.hasOne(Famille, {
  foreignKey: 'utilisateur_id',
  as: 'accueillant',
});

Famille.belongsTo(Utilisateur, {
  foreignKey: 'utilisateur_id',
  as: 'identifiant_famille',
});

/* Relation One-to-Many : Animal <-> Media */

Animal.hasMany(Media, {
  foreignKey: 'animal_id',
  as: 'images_animal',
});

Media.belongsTo(Animal, {
  foreignKey: 'animal_id',
  as: 'animal',
});

/* Relation One-to-Many : Animal <-> Media */

Association.hasMany(Media, {
  foreignKey: 'association_id',
  as: 'images_association',
});

Media.belongsTo(Association, {
  foreignKey: 'association_id',
  as: 'association',
});

/* Relation One-to-Many : Association <-> Animal */

Association.hasMany(Animal, {
  foreignKey: 'association_id',
  as: 'pensionnaires',
});

Animal.belongsTo(Association, {
  foreignKey: 'association_id',
  as: 'refuge',
});

/* Relation One-to-Many : Espèce <-> Animal */

Espece.hasMany(Animal, {
  foreignKey: 'espece_id',
  as: 'representants',
});

Animal.belongsTo(Espece, {
  foreignKey: 'espece_id',
  as: 'espece',
});

/* Relation One-to-Many : Famille <-> Animal */

Famille.hasMany(Animal, {
  foreignKey: 'famille_id',
  as: 'animaux',
});

Animal.belongsTo(Famille, {
  foreignKey: 'famille_id',
  as: 'accueillant',
});

/* Relation Many-to-Many : Tag <-> Animal */

Tag.belongsToMany(Animal, {
  foreignKey: 'tag_id',
  otherKey: 'animal_id',
  through: Animal_Tag,
  as: 'animaux_taggés',
});

Animal.belongsToMany(Tag, {
  foreignKey: 'animal_id',
  otherKey: 'tag_id',
  through: Animal_Tag,
  as: 'tags',
});

/* Relation Many-to-Many : Animal <-> Famille */

Animal.belongsToMany(Famille, {
  foreignKey: 'animal_id',
  otherKey: 'famille_id',
  through: Demande,
  as: 'demandes',
});

Famille.belongsToMany(Animal, {
  foreignKey: 'famille_id',
  otherKey: 'animal_id',
  through: Demande,
  as: 'potentiel_accueillant',
});

export { Animal, Animal_Tag, Association, Demande, Espece, Famille, Media, Tag, Utilisateur };
