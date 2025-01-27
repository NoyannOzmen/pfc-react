/*
import Joi from 'joi';
import { Card, List } from '../models/index.js';
import { hexadecimalColorSchema } from './JOI-VALIDATE-HEX-STRING.js';
*/

import { Association, Animal, Demande, Espece, Famille, Media, Tag, Utilisateur } from "../models/Models.js";
import { Op } from "sequelize";
import { sequelize } from "../models/sequelizeClient.js";

const associationController = {
    //* Liste des associations
    async getAll(req, res) {
        // Récupérer toutes les associations en BDD
        const associations = await Association.findAll({
            include :  [ 'images_association', 'identifiant_association', 'pensionnaires' ]
        });
        
        const especes = await Espece.findAll();
        
        /* // Envoyer une réponse
        res.render("listeAssociations",{ associations, especes }); */
        res.json(associations)
    },
    //* Liste des associations RECHERCHEES
    async getSearched(req,res) {
        const {
            espece,
            dptSelect,
            shelterNom
        } = req.body;
        console.log(req.body)

        if (req.body.dptSelectFull) {
            req.body.dptSelect = req.body.dptSelectFull
        } else {
            req.body.dptSelect = req.body.dptSelectSmall
        }
        
        const especes = await Espece.findAll();
        
        const associations = await Association.findAll({
            include : [ 
                'images_association',
                { model : Animal, as : "pensionnaires", include : { model : Espece, as : "espece" } }],
                where : {
                    nom : (req.body.nom) ? (req.body.shelterNom) : { [Op.ne]: null },
                    code_postal : (req.body.dptSelect) ? { [Op.startsWith] : req.body.dptSelect } : { [Op.ne] : null },
                    '$pensionnaires.espece.nom$' : (req.body.espece ) ? req.body.espece : { [Op.ne] : null },
                }
            });
            
            /* return res.render("listeAssociations", { associations, especes }); */
            return res.json(associations);
    },
    /* MàJ Asso */
    async update(req,res) {
        /* const associationId = req.session.userId; */
        const associationId = Number(req.body.id)
        const association = await Association.findByPk(associationId);
        
        if (!association) {
            return next();
        }
        
        // Element à Update
        const { nom, responsable, rue, commune, code_postal, pays, siret, telephone, site, description } = req.body;
        
        const updatedAssociation = await association.update({
            nom : nom || association.nom,
            responsable : responsable || association.responsable,
            rue : rue || association.rue,
            commune : commune || association.commune,
            code_postal : code_postal || association.code_postal,
            pays : pays || association.pays,
            siret : siret || association.siret,
            telephone : telephone || association.telephone,
            site: site || association.site,
            description: description || association.description
        });
        
        console.log('success')
        console.log(updatedAssociation);
        /* res.redirect("/associations/profil") */
        res.json(updatedAssociation)
        
    },
    async uploadImage(req, res,next){
        /* console.log("file is" + req.file) */
        let userImage = req.file.path;
        const trim = userImage.replace("./assets", "");
        /* console.log('path is' + trim); */

        /* const assoId = req.session.userId; */
        /* console.log("body is")
        console.log(req.body) */
        const assoId = req.body.assoId;
        /* console.log(assoId); */
        
        const association = await Association.findByPk(assoId, {
            include : 'images_association'
        });

        
        console.log('asso is' + JSON.stringify(association))
        
        const newMedia = await Media.create({
            association_id : association.id,
            url : trim,
            ordre : 1
        })
        
        /* console.log('image is' + JSON.stringify(newMedia));
        console.log(`C'est good`) */
        await newMedia.save();
        /* res.render("profilAssociationLogo", {association}); */
        res.json(association)
    },
    async denyRequest(req,res) {
        const requestId = req.params.id;
        
        const request = await Demande.findByPk(requestId);
        
        const updatedRequest = await request.update({
            statut_demande : 'Refusée'
        });
        
        console.log(updatedRequest);
        await updatedRequest.save();
        
        /* res.redirect('/associations/profil/demandes/' + requestId) */
        res.json(updatedRequest)
    },
    async approveRequest(req,res) {
        const requestId = req.params.id;
        
        const request = await Demande.findByPk(requestId);
        
        await request.update({
            statut_demande : 'Validée'
        });
        await request.save();
        
        
        const otherRequests = await Demande.findAll({
            where :{
                animal_id:request.animal_id,
                [Op.not]: {
                    id : parseInt(req.params.id)
                }
            }
        });
        
        
        for (const demande of otherRequests) {
            
            await demande.update({
                statut_demande:"Refusée"
            });
            
            await demande.save();
            
        }
        
        const animal = await Animal.findByPk(request.animal_id);
        await animal.update({famille_id:request.famille_id});
        await animal.save();
        
        /*  res.redirect('/associations/profil/demandes/' + requestId) */
        res.json(request)
    }, 
};

export { associationController };
                    