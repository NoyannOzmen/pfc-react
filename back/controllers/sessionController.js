import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import jwt from 'jsonwebtoken';

import { Animal, Famille, Utilisateur, Association, Espece } from '../models/Models.js';
import { slugify } from '../middlewares/slug.js';

export const sessionController = {
    async logIn(req,res) {    
        const {
            email, 
            mot_de_passe
        } = req.body

        if (!emailValidator.validate(email)) {
            const status = 401;
            const message = 'Identifiants incorrects. Merci de ré-essayer.';

            return res.status(status).json({ status, message });
        }

        const user = await Utilisateur.findOne({            
            where : {
                email: email
            },
            include : ['refuge','accueillant']
        })

        if (user && await bcrypt.compare(mot_de_passe, user.mot_de_passe)) {
            user.mot_de_passe = '';
            const payload = { sub: user.id, email: user.email, shelter: user.refuge?.id, foster: user.accueillant?.id  };
            const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1800s' })
        return res.status(200).json({ user, access_token})
        }
        return res.status(401).json({ message : 'Identifiants incorrects. Merci de ré-essayer.'});
    },
    async logOut(req,res) {
        req.session.destroy();
    },
    async fosterSignIn(req,res) {    
        const { 
            prenom,
            nom, 
            email,
            telephone,
            hebergement,
            terrain,
            rue,
            commune,
            code_postal,
            pays, 
            mot_de_passe, 
            confirmation 
        } = req.body;

        const found = await Utilisateur.findOne( { where: {email: email} });

        if (!emailValidator.validate(email)) {
            const status = 401;
            const message = `Cet email n'est pas valide.`;

            return res.status(status).json({ status, message });
        }

        if (mot_de_passe !== confirmation) {
            const status = 401;
            const message = 'La confirmation du mot de passe ne correspond pas au mot de passe renseigné.';

            return res.status(status).json({ status, message });
        }
        
        if(found === null) {

            const hashedPassword = await bcrypt.hash(mot_de_passe, 8);
            
            const newUser = await Utilisateur.create({
                email: email,
                mot_de_passe : hashedPassword,
            })

            await newUser.save();
            
            const newFoster = await Famille.create({
                prenom : prenom,
                nom : nom,
                telephone: telephone,
                hebergement: hebergement,
                terrain : terrain,
                rue: rue,
                commune : commune,
                code_postal: code_postal,
                pays: pays,
                utilisateur_id: newUser.id,
            });
            await newFoster.save();
            const status = 200
            const message = 'Inscription Correcte';

            return res.status(status).json({ status, message });
        } else {
            const status = 401;
            const message = 'Inscription incorrecte';

            return res.status(status).json({ status, message });
        }
    },
    async fosterUpdate(req,res, next) {
        const familleId = Number(req.body.id);
        const famille = await Famille.findByPk(familleId);
        
        if (!famille) {
            return next();
        }

        const { prenom, nom, telephone, rue, commune, code_postal, pays, hebergement, terrain } = req.body;
        const updatedFamille = await famille.update({
            prenom : prenom || famille.prenom,
            nom : nom || famille.nom,
            telephone : telephone || famille.telephone,
            rue : rue || famille.rue,
            commune : commune || famille.commune,
            code_postal : code_postal || famille.code_postal,
            pays : pays || famille.pays,
            hebergement : hebergement || famille.hebergement,
            terrain : terrain || famille.terrain,
        });

        res.json(updatedFamille)
    }, 
    async fosterDestroy(req, res, next) {
        const familleId = req.body.accueillant.id;
        const famille = await Famille.findByPk(familleId);

        const user = await Utilisateur.findOne({
            where : { id: famille.utilisateur_id }
        })

        if (!famille || !user) {
            return next();
        };

        const fostered = Animal.findAll({
            where :  { famille_id : familleId } 
        })

        if (fostered) {
            const status = 401;
            const message =  'Vous accueillez actuellement un animal. Merci de contacter le refuge concerné avant de supprimer votre compte !'
            return res.status(status).json({ status, message })
        }
        await famille.destroy();
        await user.destroy();
        req.session.destroy();
        res.status(201).json({ message : "done" })
    },
    async shelterSignIn(req,res) {
        const { 
            nom, 
            responsable, 
            rue, 
            commune, 
            code_postal, 
            pays, 
            siret, 
            telephone, 
            email, 
            site,
            description,
            mot_de_passe, 
            confirmation 
        } = req.body;
        
        const found = await Utilisateur.findOne( { where: {email: email} });
        
        if(found === null) {
            if (!emailValidator.validate(email)) {
                const status = 401;
                const message = `Cet email n'est pas valide.`;
    
                return res.status(status).json({ status, message });
            }

            if (mot_de_passe !== confirmation) {
                const status = 401;
                const message = 'La confirmation du mot de passe ne correspond pas au mot de passe renseigné.';
    
                return res.status(status).json({ status, message });
            }
            
            const hashedPassword = await bcrypt.hash(mot_de_passe, 8);
            
            const newUser = await Utilisateur.create({
                email: email,
                mot_de_passe : hashedPassword,
            })
            await newUser.save();
            
            const newShelter = await Association.create({
                nom : nom,
                responsable : responsable,
                rue : rue,
                commune : commune,
                code_postal : code_postal,
                pays : pays,
                siret : siret,
                telephone : telephone,
                site: site,
                description: description,
                utilisateur_id: newUser.id,
                slug: ''
            });

            //* Slugification of the shelter's zipcode, its name, and Id
            const shelterDpt = newShelter.code_postal.slice(0,2);

            const sluggedName = slugify(newShelter.nom);
            const slug = `${shelterDpt}-${sluggedName}-${newShelter.id}`
            newShelter.slug = slug;

            await newShelter.save();

            const status = 200
            const message = 'Inscription Correcte';

            return res.status(status).json({ status, message });
        } else {
            const status = 401;
            const message = 'Inscription incorrecte';

            return res.status(status).json({ status, message });
        }
    },
    async shelterDestroy(req, res, next) {
        const assoId = Number(req.body.refuge.id);
        const asso = await Association.findByPk(assoId);

        const user = await Utilisateur.findOne({
            where : { id: asso.utilisateur_id }
        })

        if (!asso || !user) {
            return next();
        };

        const fostered = Animal.findAll({
            where :  { refuge_id : assoId } 
        })

        if (fostered) {
            const status = 401;
            const message = 'Vous accueillez actuellement un ou plusieurs animaux. Merci de nous contacter afin de supprimer votre compte !';

            return res.status(status).json({ status, message })
        }

        await asso.destroy();
        await user.destroy();
        req.session.destroy();
        res.status(201).json({ message : "done" })
    },   
};