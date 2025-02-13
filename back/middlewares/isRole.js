//* Middlewares à passer pour authentifier les routes association/famille

export const isRole = {
    
    association(req,res,next){
        
        if (req.session.role==='association'){
            return next();
        }
    const error = new Error("Accès non autorisé");
    res.status(401).render("403");
    error.status = 401;
    next(error);
    },

    famille(req,res,next){
        
        if (req.session.role==='famille'){
            return next();
        }
    const error = new Error("Accès non autorisé");
    res.status(401).render("403");
    error.status = 401;
    next(error);
    }
}
