import { Router } from "express";
import { animalController } from "../controllers/animalController.js";
import { catchErrors } from "../middlewares/catchErrors.js";

const staticPageRouter = Router();

//* Rendu de la page d'accueil avec le carrousel
staticPageRouter.get('/', catchErrors(animalController.homePage) )

staticPageRouter.get("/a-propos", (req,res) => res.render("aPropos"));
staticPageRouter.get("/contact", (req,res) => res.render("contact"));
staticPageRouter.get("/faq", (req,res) => res.render("faq"));
staticPageRouter.get("/infos-legales", (req,res) => res.render("infosLegales"));
staticPageRouter.get("/rgpd", (req,res) => res.render("rgpd"));
staticPageRouter.get("/devenir-famille-d-accueil", (req,res) => res.render("devenirFamille"));
staticPageRouter.get("/plan", (req,res) => res.render("plan"))

export { staticPageRouter };