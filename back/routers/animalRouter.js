import { Router } from 'express';

import { animalController } from '../controllers/animalController.js';
import { catchErrors } from '../middlewares/catchErrors.js';
import { auth } from '../middlewares/auth.js';
import { isRole } from '../middlewares/isRole.js';
import { upload } from '../middlewares/upload.js';

const animalRouter = Router();

//* Rendu de la page avec tout les animaux disponibles
animalRouter.get('/animaux', catchErrors(animalController.availableAnimalsList));

//* Liste des especes
animalRouter.get('/especes', catchErrors(animalController.getSpeciesList));

//* Liste des tags
animalRouter.get('/tags', catchErrors(animalController.getTagsList));

//* Route de demande d'accueil d'un animal
animalRouter.post('/animaux/:id/faire-une-demande', [auth, isRole.famille], catchErrors(animalController.hostRequest));

//* Ajouter un animal à l'asssociation
animalRouter.post('/animaux/nouveau-profil', [auth, isRole.association], catchErrors(animalController.addAnimal));

//* Ajouter une image à un animal
animalRouter.post('/upload/photo', [auth, isRole.association], upload, catchErrors(animalController.uploadPhoto));

export { animalRouter };
