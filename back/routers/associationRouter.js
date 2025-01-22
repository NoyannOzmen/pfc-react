import { Router } from "express";
import { associationController } from "../controllers/associationController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";
import { upload } from "../middlewares/upload.js";

//TODO NE PAS OUBLIER D'AJOUTER LES MIDDLEWARE D'AUTHENTIFICATION AUX ROUTES CONCERNEES

const associationRouter = Router();

//Affichage de la liste complète des associations
associationRouter.get('/associations', catchErrors(associationController.getAll));

//Affichage des résultats d'une recherche association
associationRouter.post('/associations', catchErrors(associationController.getSearched));

//Affichage des détails d'une association
associationRouter.get('/associations/:id(\\d+)', catchErrors(associationController.getOne));

//* DASHBOARD

//Affichage des informations depuis le compte association
associationRouter.get('/associations/profil', auth, isRole.association, catchErrors(associationController.displayDashboard));

//Mise à jour des informations depuis le compte association
/* associationRouter.post('/associations/profil', auth, isRole.association, catchErrors(associationController.update)); */
associationRouter.post('/associations/profil', associationController.update);

//Affichage de la page Ajout d'un logo
associationRouter.get('/associations/profil/logo', auth, isRole.association, catchErrors(associationController.displayUpload));

//Ajout d'un logo
associationRouter.post("/upload/logo", auth, isRole.association, upload, catchErrors(associationController.uploadImage));

//* ROUTES AUTHENTIFIEES

associationRouter.get('/associations/profil/animaux',auth, isRole.association, catchErrors(associationController.dashboardAnimaux));

associationRouter.get('/associations/profil/animaux/suivi', auth, isRole.association, catchErrors(associationController.dashboardAnimauxSuivi));

associationRouter.get('/associations/profil/animaux/nouveau-profil', auth, isRole.association, catchErrors(associationController.dashboardAnimauxAjouter));

associationRouter.get('/associations/profil/animaux/:animalId(\\d+)',auth, isRole.association, catchErrors(associationController.dashboardAnimalDetail));

//Affichage du tableau de récapitulatif des demandes
associationRouter.get('/associations/profil/demandes', auth, isRole.association, catchErrors(associationController.dashboardRequests));

//Affichage du détail d'une demande d'accueil
associationRouter.get('/associations/profil/demandes/:id(\\d+)', auth, isRole.association, catchErrors(associationController.dashboardRequestsDisplayOne));

//Valider une demande d'accueil
associationRouter.post('/associations/profil/demandes/:id(\\d+)/accept', auth, isRole.association, catchErrors(associationController.approveRequest));

//Refuser une demande d'accueil
associationRouter.post('/associations/profil/demandes/:id(\\d+)/deny', auth, isRole.association, catchErrors(associationController.denyRequest));


export { associationRouter };
