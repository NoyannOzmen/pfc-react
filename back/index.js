import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';

const app = express();

import { router } from './routers/router.js';
import { errorHandler, notFound } from './middlewares/errorHandlers.js';
import { userMiddleware } from './middlewares/user.js';

app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'http://127.0.0.1:4173'
      ]
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

app.use(userMiddleware);

app.use(router);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Lancement réussi à l'adresse : http://localhost:${port}`);
})