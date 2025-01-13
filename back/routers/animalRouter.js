import { Router } from "express";

import { animalController } from "../controllers/animalController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";
import { upload } from "../middlewares/upload.js";

const animalRouter = Router();

//* Rendu de la page avec tout les animaux disponibles
animalRouter.get('/animaux', catchErrors(animalController.availableAnimalsList));

//* Test pour les especes
animalRouter.get('/especes', catchErrors(animalController.getSpeciesList));

//* Test pour les tags
animalRouter.get('/tags', catchErrors(animalController.getTagsList));

//* Rendu de la page avec les animaux correspondant à la recherche
animalRouter.post('/animaux', catchErrors(animalController.getSearched));

//* Rendu de la page de détail d'un animal
animalRouter.get('/animaux/:id(\\d+)', catchErrors(animalController.detailAnimal));

//* Route de demande d'accueil d'un animal par un.e user
animalRouter.post('/animaux/:id(\\d+)/faire-une-demande',[auth,isRole.famille] , catchErrors(animalController.hostRequest));

//* Ajouter un animal à l'asssociation
animalRouter.post('/animaux/nouveau-profil', [auth,isRole.association], catchErrors(animalController.addAnimal));

/* //* Accéder à l'upload de photo depuis la liste des animaux d'une association
animalRouter.get('/animaux/:id(\\d)/photo', [auth,isRole.association], catchErrors(animalController.displayUploader)); */

//* Ajouter une image à un animal
animalRouter.post("/upload/photo", [auth,isRole.association], upload, catchErrors(animalController.uploadPhoto));



export { animalRouter };
