import { Router } from "express";
import { sessionController } from "../controllers/sessionController.js";
import { catchErrors } from "../middlewares/catchErrors.js";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/isRole.js";

const sessionRouter = Router();

/* routes connexion */
sessionRouter.get('/connexion', catchErrors(sessionController.displayLogin));
sessionRouter.post('/connexion', catchErrors(sessionController.logIn));

/* route déconnexion */
sessionRouter.get('/deconnexion', catchErrors(sessionController.logOut));

//* FAMILLE
/* Inscription famille d'accueil */
sessionRouter.get('/famille/inscription', catchErrors(sessionController.displayFosterSignIn));
sessionRouter.post('/famille/inscription', catchErrors(sessionController.fosterSignIn));
/* Profil Famille */
sessionRouter.get('/famille/profil', auth, isRole.famille, catchErrors(sessionController.displayProfile));
/* Update des informations */
/* sessionRouter.post('/famille/profil', auth, isRole.famille, catchErrors(sessionController.fosterUpdate)); */
sessionRouter.post('/famille/profil', catchErrors(sessionController.fosterUpdate));
/* Suppression du compte */
sessionRouter.post('/famille/profil/delete', auth, isRole.famille, catchErrors(sessionController.fosterDestroy));
/* Suivi des demandes */
sessionRouter.get('/famille/profil/demandes', auth, isRole.famille, catchErrors(sessionController.displayRequest));

//* ASSOCIATION
/* Inscription association */
sessionRouter.get('/association/inscription', catchErrors(sessionController.displayShelterSignIn));
sessionRouter.post('/association/inscription', catchErrors(sessionController.shelterSignIn));

sessionRouter.post('/association/profil/delete', auth, isRole.association, catchErrors(sessionController.shelterDestroy));

export { sessionRouter };