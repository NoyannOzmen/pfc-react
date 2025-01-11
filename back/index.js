import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import flash from 'connect-flash';

const app = express();

import { router } from './routers/router.js';
import { errorHandler, notFound } from './middlewares/errorHandlers.js';
import { userMiddleware } from './middlewares/user.js';

app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        
      ],
    })
  );

/* app.set("view engine", "ejs");
app.set("views", "./src/views"); */
app.use(express.static("./src/assets"));
app.use(express.urlencoded({extended: true}));

app.use(
    session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1200000 }
    })
);

app.use(userMiddleware);

app.use(flash());

app.use(function(req,res,next) {
  res.locals.message = req.flash();
  next();
})

/* app.post('/upload/logo', (req, res) => {
  upload(req, res, (err) => {
     if (err) {
       console.error(err);
       return res.status(500).json({ error: err });
      }
     if (!req.file) {
        return res.status(400).json({ error: 'Please send file' });
      }
      console.log(req.file);
      res.redirect('/')
  });
}); */

app.use(router);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Lancement réussi à l'adresse : http://localhost:${port}`);
})