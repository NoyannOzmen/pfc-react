/* Imports session info to all views */

/* export const userMiddleware = (req, res, next) => {

    if (!req.session.loggedIn) {
        res.locals.loggedIn = false;
    } else {
        res.locals.loggedIn = req.session.loggedIn;
        res.locals.role = req.session.role;
        res.locals.nom = req.session.nom;
        res.locals.userId = req.session.userId;
        res.locals.prenom = req.session.prenom
    }

    next();
}; */
