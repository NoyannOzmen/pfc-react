import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';
import ErrorPage from './ErrorPage';

import HomePage from '../components/App/HomePage/HomePage.tsx';
import APropos from '../components/App/StaticPages/APropos.tsx';
import Contact from '../components/App/StaticPages/Contact.tsx';
import Faq from '../components/App/StaticPages/Faq.tsx';
import InfosLegales from '../components/App/StaticPages/InfosLegales.tsx';
import Rgpd from '../components/App/StaticPages/Rgpd.tsx';
import DevenirFamille from '../components/App/StaticPages/DevenirFamille.tsx';
import Plan from '../components/App/StaticPages/Plan.tsx';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        // pour l'instant je mets « rien » en props pour éviter les erreuts TS
        // je n'aurai plus rien à afficher comme j'envoie un tableau vide… Mais c'est une bonne nouvelle !
        element: <HomePage />,
      },
      {
        path: '/a-propos',
        element: <APropos />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/faq',
        element: <Faq />,
      },
      {
        path: '/infos-legales',
        element: <InfosLegales />,
      },
      {
        path: '/rgpd',
        element: <Rgpd />,
      },
      {
        path: '/devenir-famille-d-accueil',
        element: <DevenirFamille />,
      },
      {
        path: '/Plan',
        element: <Plan />,
      },
    ],
  },
]);

export default router;
