import { Router } from "express";

import { animalController } from "../controllers/animalController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";
import { upload } from "../middlewares/upload.js";

const animalRouter = Router();

//* All animals
animalRouter.get('/animaux', catchErrors(animalController.availableAnimalsList));

//* All species
animalRouter.get('/especes', catchErrors(animalController.getSpeciesList));

//* All tags
animalRouter.get('/tags', catchErrors(animalController.getTagsList));

//* Search results
animalRouter.post('/animaux', catchErrors(animalController.getSearched));

//* New foster request
animalRouter.post('/animaux/:id(\\d+)/faire-une-demande',[auth,isRole.famille], catchErrors(animalController.hostRequest));

//* New animal profile
animalRouter.post('/animaux/nouveau-profil', [auth,isRole.association], catchErrors(animalController.addAnimal));

//* Animal image upload
animalRouter.post("/upload/photo", [auth,isRole.association], upload, catchErrors(animalController.uploadPhoto));

export { animalRouter };
