//* Le middleware auth vérifie l'existence d'un JSON WebToken 
//* Si c'est le cas on appelle le middleware suivant
import jwt from 'jsonwebtoken';

export function auth(req,res,next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).send('Token required');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send('Invalid or expired token');
      req.user = user;
      next();
    });
}