import { Association, Animal, Demande, Espece, Media } from '../models/Models.js';
import { Op } from 'sequelize';

const associationController = {
  async getAll(req, res) {
    const associations = await Association.findAll({
      include: ['images_association', { model: Animal, as: 'pensionnaires', include: { model: Espece, as: 'espece' } }],
    });

    res.json(associations);
  },

  async update(req, res, next) {
    const associationId = Number(req.body.id);
    const association = await Association.findByPk(associationId);

    if (!association) {
      return next();
    }

    const { nom, responsable, rue, commune, code_postal, pays, siret, telephone, site, description } = req.body;

    const updatedAssociation = await association.update({
      nom: nom || association.nom,
      responsable: responsable || association.responsable,
      rue: rue || association.rue,
      commune: commune || association.commune,
      code_postal: code_postal || association.code_postal,
      pays: pays || association.pays,
      siret: siret || association.siret,
      telephone: telephone || association.telephone,
      site: site || association.site,
      description: description || association.description,
    });

    res.json(updatedAssociation);
  },
  async uploadImage(req, res) {
    let userImage = req.file.path;

    const trim = userImage.replace('./public', '');
    const assoId = req.body.asso_id;

    const association = await Association.findByPk(assoId, {
      include: 'images_association',
    });

    const newMedia = await Media.create({
      association_id: association.id,
      url: trim,
      ordre: 1,
    });

    await newMedia.save();
    res.json(association);
  },
  async denyRequest(req, res) {
    const requestId = req.params.id;

    const request = await Demande.findByPk(requestId);

    const updatedRequest = await request.update({
      statut_demande: 'Refusée',
    });

    await updatedRequest.save();
    res.json(updatedRequest);
  },
  async approveRequest(req, res) {
    const requestId = req.params.id;

    const request = await Demande.findByPk(requestId);

    await request.update({
      statut_demande: 'Validée',
    });
    await request.save();

    const otherRequests = await Demande.findAll({
      where: {
        animal_id: request.animal_id,
        [Op.not]: {
          id: parseInt(req.params.id),
        },
      },
    });

    for (const demande of otherRequests) {
      await demande.update({
        statut_demande: 'Refusée',
      });
      await demande.save();
    }

    const animal = await Animal.findByPk(request.animal_id);
    await animal.update({ famille_id: request.famille_id });
    await animal.save();

    res.json(request);
  },
};

export { associationController };
