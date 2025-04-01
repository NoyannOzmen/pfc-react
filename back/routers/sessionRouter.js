import { Router } from "express";
import { sessionController } from "../controllers/sessionController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";

const sessionRouter = Router();

/* routes connexion */
sessionRouter.post('/connexion', catchErrors(sessionController.logIn));

//* FAMILLE
/* Inscription famille d'accueil */
sessionRouter.post('/famille/inscription', catchErrors(sessionController.fosterSignIn));
/* Update des informations */
sessionRouter.post('/famille/profil', [auth, isRole.famille], catchErrors(sessionController.fosterUpdate));
/* Suppression du compte */
sessionRouter.post('/famille/profil/delete', [auth, isRole.famille], catchErrors(sessionController.fosterDestroy));

//* ASSOCIATION
/* Inscription association */
sessionRouter.post('/association/inscription', catchErrors(sessionController.shelterSignIn));
/* Suppression du compte */
sessionRouter.post('/association/profil/delete', [auth, isRole.association], catchErrors(sessionController.shelterDestroy));

export { sessionRouter };