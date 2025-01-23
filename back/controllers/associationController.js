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
            include :  [ 'images_association', 'identifiant_association' ]
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
        
    /* Détails d'une Association */
    async getOne(req, res, next) {
        // * Est-ce suffisant pour garantir une sécurité ?
        const associationId = req.params.id;
        // Récupérer l'association' en BDD (avec potentiellement ses tags)
        const association = await Association.findByPk(associationId, {
            include : [
                'pensionnaires',
                'images_association',
                'identifiant_association',
                { model : Animal, as : "pensionnaires",
                include: ['images_animal', 'espece'] }
            ]
        });
        // Si l'associaton n'existe pas (ID=90000 => null) ==> 404
        if (!association) {
            return next();
        }
        // Envoyer une réponse
        /* res.render("detailAssociation", { association }); */
        res.json(association);
    },

    /* Afficher le profil (dashboard) d'une association */
    async displayDashboard(req,res,next){
    
        const associationId = req.session.userId;
        
        const association = await Association.findByPk(associationId);
        
        /* res.render('profilAssociationInfos', { association }); */
        res.json(association)
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
    
    /* Supprimer une association */
    async destroy(req, res, next) {
        
        //*Vérification que l'utilisateur.ice connecté.e est bien cellui qui doit être supprimé.e
        //* (on ne veut pas que n'importe qui puisse supprimer un compte asso)
        
        if (!(parseInt(req.session.id)===parseInt(req.params.id))){
            
            res.status=401;
            return next(new Error('Unauthorized'))
            
        }
        
        
        // Récupérer l'Id de l'association à supprimer
        const associationId = req.params.id;
        
        const association = await Association.findByPk(associationId, {
            include: 'images_association'
        });

        if (!association) {
            // Si pas entier ou pas existant dans la BDD => 404
            return next();
        }
        
        await association.destroy();
        
        // Sinon on supprime et on renvoie une 204 avec un body vide.
        res.status(204).end();
    },

    async displayUpload(req,res,next){
        
            const associationId = req.session.userId;
            
            const association = await Association.findByPk(associationId);
            
            /* res.render('profilAssociationLogo', { association }); */
            res.json(association)
    },
    
    async uploadImage(req, res,next){
        console.log("file is" + req.file)
        let userImage = req.file.path;
        const trim = userImage.replace("./assets", "");
        console.log('path is' + trim);

        /* const assoId = req.session.userId; */
        const assoId = 1;
        console.log(assoId);
        
        const association = await Association.findByPk(assoId, {
            include : 'images_association'
        });
        
        console.log('asso is' + JSON.stringify(association))
        
        const newMedia = await Media.create({
            association_id : association.id,
            url : trim,
            ordre : 1
        })
        
        console.log('image is' + JSON.stringify(newMedia));
        console.log(`C'est good`)
        await newMedia.save();
        /* res.render("profilAssociationLogo", {association}); */
        res.json(association)
    },

    async dashboardAnimaux(req,res,next){
        
        const associationId = req.session.userId;
        
        const animals = await Animal.findAll({
            order: [
                sequelize.col('espece_id'),
                'statut'
            ],
            include: [
                'espece',
                'images_animal',
                {
                    model : Association,
                    as : 'refuge',
                    where: {
                        id : associationId,
                    },
                },
                
            ]
        });
        
        const especes = await Espece.findAll(
            {
                where: {'$representants.association_id$':associationId},
                include : {
                    model :Animal,
                    as :'representants',
                    attributes:[]
                    
                    
                }
            }
            )
            
            /*
            animaux : tableau d'animaux contenant notamment un objet espece,
            un tableau images_animal, un objet refuge, un object accueillant,
            un tableau tags et un tableau demande
            */
            
            /* res.render('profilAssociationAnimauxListe',{ animals,especes }); */
            //res.send(animals);
            res.json(animals, especes)
        },

    async dashboardAnimauxSuivi (req, res ,next) {
        
        const associationId = req.session.userId;
        
        const animals = await Animal.findAll({
            where : {statut:'Accueilli'},
            include : [
                'espece',
                'images_animal',
                {
                    model : Association,
                    as : 'refuge',
                    where: {
                        id : associationId,
                    },  
                },
                'tags',
                {
                    model : Famille,
                    as :'accueillant',
                    include : {
                        model: Utilisateur,
                        as :'identifiant_famille',
                        attributes : ['id','email']
                    }
                }
                
            ]
        })
        
        //res.send(animals);
        /* res.render('profilAssociationAnimauxSuiviAccueil',{ animals }); */
        res.json(animals)
        
    },

    //* Rendu de la page créer un profil animal
    //! La soumission du formulaire en POST est sur le animalController
    async dashboardAnimauxAjouter (req, res, next) {
        
        const especes = await Espece.findAll();
        const tags = await Tag.findAll();
        /* res.render('profilAssociationAnimauxAjouter', {especes,tags});  */  
        res.json(especes, tags) 
    },

    async dashboardAnimalDetail (req,res,next) {
        const associationId=req.session.userId;
        
        
        const animal = await Animal.findByPk(
            req.params.animalId,
            {
                include : [
                    'espece',
                    'images_animal',
                    'tags',
                    'refuge',
                    {
                        model : Famille,
                        as :'accueillant',
                        include : {
                            model: Utilisateur,
                            as :'identifiant_famille',
                            attributes : ['id','email']
                        }
                    },
                    'demandes'
                    
                ]
            });
            
            if (animal) {
                
                if (!(associationId===animal.refuge.id)){
                    return next();
                }
                
            } else {
                
                return next();
                
            }
            
            req.session.animalId=animal.id;    
            // res.send(animal);
            /* res.render('profilAssociationAnimauxDetail', {animal}); */
            res.json(animal)
            
            
    },

    /* Afficher les demandes en cours */
    async dashboardRequests(req,res) {
        /*  const associationId = req.params.id; */
        
        const associationId = req.session.userId;
        const association = await Association.findByPk(associationId);
        
        if (!association) {
            return next();
        }
        
        const requestedAnimals = await Animal.findAll({
            where : [
                { '$refuge.id$' : associationId },
                { '$demandes.id$':  { [Op.not] : null }}
            ],
            include: [ "demandes", "refuge" ],
        })
        
        /*  res.render('profilAssociationDemande', { association, requestedAnimals }); */
        res.json(association, requestedAnimals)
    },

    /* Afficher les détails d'une demande en cours */
    async dashboardRequestsDisplayOne(req,res) {
        const associationId = req.session.userId;
        const association = await Association.findByPk(associationId);
        
        if (!association) {
            return next();
        }
        
        const requestId = req.params.id;
        
        const request = await Demande.findOne({
            where : { id :requestId } });
            
            const famille = await Famille.findOne({
                where: { id : request.famille_id},
                include : ['identifiant_famille']
            })
            
            const animal = await Animal.findOne({
                where : { id : request.animal_id},
                include : ['espece', 'tags', 'images_animal']
            })
            /* 
            console.log('Demande' + request )
            console.log('Famille' + famille);
            console.log("Animal : " + animal ); */
            
            /* res.render('profilAssociationDemandeSuivi', { association, request, famille, animal }) */
            res.json(association, request, famille, animal)
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
      
    //! POSSIBLY USELESS
    /* Lister les animaux d'une association */
    async getAllAnimals(req, res, next) {
        // * Est-ce suffisant pour garantir une sécurité ?
        const associationId = req.params.id;
        // Récupérer l'association' en BDD (avec potentiellement ses tags)
        const association = await Association.findByPk(associationId, {
            include: ['animaux']
        });
        // Si l'associaiton n'existe pas (ID=90000 => null) ==> 404
        if (!association) {
            return next();
        }
        // Envoyer une réponse
        /* res.render("detailAssociation",{ association }); */
        res.json(association)
    }   
};

export { associationController };
                    