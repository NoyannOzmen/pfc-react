//* Middlewares à passer pour authentifier les routes association/famille

export const isRole = {
    
    association(req,res,next){
        if (req.user.shelter) {
            return next();
        }

        const error = new Error("Accès non autorisé");
        res.status(403).render("403");
        error.status = 403;
        next(error);
    },

    famille(req,res,next){
        if (req.user.foster) {
            return next();
        }
        const error = new Error("Accès non autorisé");
        res.status(403).render("403");
        error.status = 403;
        next(error);
        }
}
