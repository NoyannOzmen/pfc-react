/*
import Joi from 'joi';
import { Card, List } from '../models/index.js';
import { hexadecimalColorSchema } from './JOI-VALIDATE-HEX-STRING.js';
*/
import { Espece, Famille } from "../models/Models.js";

const familleController = {   
    //* Détails d'une famille
    async getOne(req, res, next) {
        // * Est-ce suffisant pour garantir une sécurité ?
        const familleId = req.params.id;
        console.log(familleId)
        // Récupérer la famille en BDD (avec potentiellement ses tags)
        const famille = await Famille.findByPk(familleId, { include : ['identifiant_famille'] });
        const especes = await Espece.findAll();
        // Si la famille n'existe pas (ID=90000 => null) ==> 404
        if (!famille) {
            return next();
        }
        // Envoyer une réponse
        res.render("profilFamilleInfos",{ famille, especes });
    },
    
    //* Lister les animaux d'une famille
    async getAllAnimals(req, res, next) {
        // * Est-ce suffisant pour garantir une sécurité ?
        const familleId = req.params.id;
        // Récupérer l'association' en BDD (avec potentiellement ses tags)
        const famille = await Famille.findByPk(familleId, {
            include: ['animaux']
        });
        // Si la famille n'existe pas (ID=90000 => null) ==> 404
        if (!famille) {
            return next();
        }
        // Envoyer une réponse
        res.render("detailFamille",{ famille });
    },
    
    //* Ajouter un animal à une famille
    async addAnimal(req,res, next) {
        const familleId = req.params.id;
        const famille = await Famille.findByPk(familleId);
        if(!famille) {
            return next();
        }
        
        await famille.addAnimal(newAnimal);
        /* Sequelize Lazy Loading ? (Je crois) */
    },
    
    //* Afficher les demandes réalisé par une famille
    async getAllRequests(req, res, next) {
        const familleId = req.params.id;
        const famille = await Famille.findByPk(familleId);
        
        if(!famille) {
            return next();
        }
        
        await famille.getAllRequests();
        
    },
}

export { familleController }


