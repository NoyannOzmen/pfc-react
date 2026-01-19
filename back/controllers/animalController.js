import { Famille } from "../models/Famille.js";
import { Animal, Association, Demande, Espece, Media, Tag } from "../models/Models.js";
import { Op } from "sequelize";


export const animalController = {

    async availableAnimalsList(req,res) {
        const animals = await Animal.findAll({
            include : [
                "espece",
                "images_animal",
                "demandes",
                { model : Association, as : "refuge", include: ["images_association"/* , "identifiant_association" */]},
                { model : Famille, as : "accueillant"/* , include: ["identifiant_famille"] */},
                { model : Tag, as : "tags" },
            ]
        })
        
        const especes = await Espece.findAll();
        const tags = await Tag.findAll();
        
       res.json(animals)
    },
     async getSpeciesList(req,res) {
        const especes = await Espece.findAll();

        res.json(especes);
    },
    async getTagsList(req,res) {
        const tags = await Tag.findAll();

        res.json(tags);
    },
    async getSearched(req,res) {

        const {
            especeDropdown,
            dptSelect,
            sexe,
            minAge,
            maxAge,
            tag
        } = req.body;

        if (req.body.especeDropdownFull) {
            req.body.especeDropdown = req.body.especeDropdownFull
        } else {
            req.body.especeDropdown = req.body.especeDropdownSmall
        }
        
        const especes = await Espece.findAll();
        const tags = await Tag.findAll();

        const animals = await Animal.findAll({
            include : [
                "espece",
                "images_animal",
                { model : Association, as : "refuge"},
                { model : Tag, as : "tags" }
            ],
            where : {
                statut:'En refuge',
                '$espece.nom$' : (req.body.especeDropdown) ? { [Op.like] : req.body.especeDropdown} : { [Op.ne]: null },
                sexe : (req.body.sexe) ? (req.body.sexe) : { [Op.ne]: null },
                '$refuge.code_postal$' : (req.body.dptSelect) ? { [Op.startsWith] : req.body.dptSelect } : { [Op.ne] : null },
                age : ( req.body.minAge ) ? { [Op.gte]: req.body.minAge } : ( req.body.maxAge ) ? { [Op.lte]: req.body.maxAge } : {[Op.ne]: null },
                '$tags.nom$' : (req.body.tag.length) ? { [Op.or] : [ { [Op.not] : req.body.tag }, /* { [Op.notLike]: { [Op.any]: req.body.tag } }, */ { [Op.is]: null } ] } : { [Op.or] : [ { [Op.ne] : null }, { [Op.is] : null } ] },
            }
        });
        
        return res.json(animals)
    },
    async hostRequest(req, res, next){
        const animalId = Number(req.body.animalId);
        const familleId = Number(req.body.familleId);
       
        const animalExists = await Animal.findByPk(animalId);
        if (!animalExists){
            next();
        }

        const found = await Demande.findOne({
            where :{ 
                [Op.and] : [
                    {famille_id: familleId},
                    {animal_id: animalId}
                ]
            }
        });

        if (found === null) {
            const newRequest = await Demande.create({
                famille_id : familleId,
                animal_id : animalId,
                statut_demande:'En attente',
                date_debut:'01/22/2025',
                date_fin:'12/31/2552'
            });

            await newRequest.save();

            const status = 200;
            const message = 'Votre demande a bien été prise en compte !';

            return res.status(status).json({ status, message });
        } else {
            const status = 401;
            const message = 'Vous avez déjà effectué une demande pour cet animal !';

            return res.status(status).json({ status, message });
        }   
    },
    async addAnimal (req,res,next) {
        const assoId = Number(req.body.association_id)

        const tagNumber = await Tag.count();
        const tagIdArray = [];

        for (let i = 0; i < tagNumber; i++) {

            const hasProperty = Object.hasOwn(req.body, `tag_${i+1}`);
            if (hasProperty){
                tagIdArray.push(parseInt(req.body[`tag_${i+1}`]));
            }
        }
        
        const {
            nom_animal,
            age_animal,
            sexe_animal,
            espece_animal,
            race_animal,
            couleur_animal,
            description_animal
        } = req.body

        const refuge = await Association.findByPk(assoId)

        if (!refuge){
            next();
        }

        const newAnimal = await Animal.create(
            {
                nom : nom_animal,
                couleur: couleur_animal,
                age:age_animal,
                sexe:sexe_animal,
                race:race_animal,
                description:description_animal,
                statut:'En refuge',
                association_id:assoId,
                espece_id:espece_animal,
            });

        const newMedia = await Media.create(
            {
                animal_id : newAnimal.id,
                url: "/images/animal_empty.webp",
                ordre: 1
            })

        if (tagIdArray) {
            for (const tagId of tagIdArray) {
                const tag = await Tag.findByPk(tagId);
                await newAnimal.addTag(tag)
            }
        }
        res.json(newAnimal)
    },
    async uploadPhoto(req, res, next){
        let userImage = req.file.path;
        const trim = userImage.replace("./public", "");
        const animalId = req.body.animal_id;

        const animal = await Animal.findByPk(animalId, {
            include : 'images_animal'
        });

        const newMedia = await Media.create({
            animal_id : animal.id,
            url : trim,
            ordre : 1
        })

        await newMedia.save();
        res.json(newMedia)
    },
}
    