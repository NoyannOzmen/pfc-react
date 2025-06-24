import { Router } from "express";
import { associationController } from "../controllers/associationController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";
import { upload } from "../middlewares/upload.js";

const associationRouter = Router();

//* All shelters
associationRouter.get('/associations', catchErrors(associationController.getAll));

//* Search results
associationRouter.post('/associations', catchErrors(associationController.getSearched));

//* DASHBOARD
//* Update infos
associationRouter.post('/associations/profil', [auth, isRole.association], catchErrors(associationController.update));

//* Shelter logo upload
associationRouter.post("/upload/logo", [auth, isRole.association], upload, catchErrors(associationController.uploadImage));

//* AUTH ROUTES
//* Accept current request
associationRouter.post('/associations/profil/demandes/:id(\\d+)/accept', [auth, isRole.association], catchErrors(associationController.approveRequest));

//* Deny current request
associationRouter.post('/associations/profil/demandes/:id(\\d+)/deny', [auth, isRole.association], catchErrors(associationController.denyRequest));


export { associationRouter };
