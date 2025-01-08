import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';
import ErrorPage from './ErrorPage';

import HomePage from '../components/App/HomePage/HomePage.tsx';
/* import ProductPage from '../components/App/Products/ProductPage';
import CategoryPage from '../components/App/Categories/CategoriesPage';
import CartPage from '../components/App/CartPage/CartPage'; */

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
      // route paramétrée pour les produits
/*       {
        path: '/product/:productId',
        element: <ProductPage />,
      },
      {
        path: '/category/:categorySlug',
        element: <CategoryPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      }, */
    ],
  },
]);

export default router;
