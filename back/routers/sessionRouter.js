import { Router } from "express";
import { sessionController } from "../controllers/sessionController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";

const sessionRouter = Router();

//* LogIn
sessionRouter.post('/connexion', catchErrors(sessionController.logIn));

//* FAMILLE
//* Foster signin
sessionRouter.post('/famille/inscription', catchErrors(sessionController.fosterSignIn));
//* Update foster infos
sessionRouter.post('/famille/profil', [auth, isRole.famille], catchErrors(sessionController.fosterUpdate));
// Account deletion
sessionRouter.post('/famille/profil/delete', [auth, isRole.famille], catchErrors(sessionController.fosterDestroy));

//* ASSOCIATION
//* Shelter signin
sessionRouter.post('/association/inscription', catchErrors(sessionController.shelterSignIn));
//* Account deletion
sessionRouter.post('/association/profil/delete', [auth, isRole.association], catchErrors(sessionController.shelterDestroy));

export { sessionRouter };