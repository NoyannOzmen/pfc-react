import { Router } from "express";
import { associationController } from "../controllers/associationController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";
import { upload } from "../middlewares/upload.js";

const associationRouter = Router();

//Affichage de la liste complète des associations
associationRouter.get('/associations', catchErrors(associationController.getAll));

//Affichage des résultats d'une recherche association
associationRouter.post('/associations', catchErrors(associationController.getSearched));

//* DASHBOARD
//Mise à jour des informations depuis le compte association
associationRouter.post('/associations/profil', [auth, isRole.association], catchErrors(associationController.update));

//Ajout d'un logo
associationRouter.post("/upload/logo", [auth, isRole.association], upload, catchErrors(associationController.uploadImage));

//* ROUTES AUTHENTIFIEES
//Valider une demande d'accueil
associationRouter.post('/associations/profil/demandes/:id(\\d+)/accept', [auth, isRole.association], catchErrors(associationController.approveRequest));

//Refuser une demande d'accueil
associationRouter.post('/associations/profil/demandes/:id(\\d+)/deny', [auth, isRole.association], catchErrors(associationController.denyRequest));


export { associationRouter };
