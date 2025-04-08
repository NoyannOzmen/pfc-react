import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';

const app = express();

import { router } from './routers/router.js';
import { errorHandler, notFound } from './middlewares/errorHandlers.js';

app.use(
    cors({
      origin: process.env.ALLOWED_DOMAINS.split(" ")
    })
  );

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1200000 }
    })
);

app.use(router);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Lancement réussi à l'adresse : http://localhost:${port}`);
})