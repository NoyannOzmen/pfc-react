import { createBrowserRouter } from 'react-router-dom';

import Root from './Root.tsx';
import ErrorPage from './ErrorPage.tsx';

import HomePage from '../components/App/HomePage/HomePage.tsx';
import APropos from '../components/App/StaticPages/APropos.tsx';
import Contact from '../components/App/StaticPages/Contact.tsx';
import Faq from '../components/App/StaticPages/Faq.tsx';
import InfosLegales from '../components/App/StaticPages/InfosLegales.tsx';
import Rgpd from '../components/App/StaticPages/Rgpd.tsx';
import DevenirFamille from '../components/App/StaticPages/DevenirFamille.tsx';
import Plan from '../components/App/StaticPages/Plan.tsx';
import Login from '../components/App/StaticPages/Login.tsx';

import ShelterDetails from '../components/App/Shelter/ShelterDetails.tsx';
import ShelterList from '../components/App/Shelter/ShelterList.tsx';
 
import AnimalList from '../components/App/Animals/AnimalList.tsx';
import AnimalDetails from '../components/App/Animals/AnimalDetails.tsx';

import ShelterSignIn from '../components/App/Shelter/ShelterSignIn.tsx';
import FosterSignIn from '../components/App/Foster/FosterSignIn.tsx';

import FosterAnimalRequest from '../components/App/Foster/FosterAnimalRequest.tsx';
import FosterProfile from '../components/App/Foster/FosterProfile.tsx';
import FosterRequest from '../components/App/Foster/FosterRequest.tsx';

import ShelterDashboard from '../components/App/Shelter/ShelterDashboard.tsx';
import ShelterPictureUpload from '../components/App/Shelter/ShelterPictureUpload.tsx';
import ShelterRequestDetails from '../components/App/Shelter/ShelterRequestDetails.tsx';
import ShelterRequestList from '../components/App/Shelter/ShelterRequestList.tsx';
import ShelterResidentAddProfile from '../components/App/Shelter/ShelterResidentAddProfile.tsx';
import ShelterResidentDetails from '../components/App/Shelter/ShelterResidentDetails.tsx';
import ShelterResidentList from '../components/App/Shelter/ShelterResidentList.tsx';
import ShelterResidentProfileList from '../components/App/Shelter/ShelterResidentProfileList.tsx';
import ShelterUploadPage from '../components/App/Shelter/ShelterUploadPage.tsx';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
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
      /* Shelter List Routes */
      {
        path: '/associations/:shelterId',
        element: <ShelterDetails />
      },
      {
        path: '/associations',
        element: <ShelterList />
      },
      /* Animal Routes */
      {
        path: '/animaux/:animalId',
        element: <AnimalDetails />,
      },
      {
        path: '/animaux/:animalId/faire-une-demande',
        element: <FosterAnimalRequest />,
      },
      {
        path: '/animaux',
        element: <AnimalList />,
      },
      {
        path: '/animaux/nouveau-profil',
        element: <ShelterResidentAddProfile />,
      },
      {
        path: '/upload/photo',
        element: <ShelterPictureUpload />,
      },
      /* Session Routes */
      {
        path: '/connexion',
        element: <Login />,
      },
      {
        path: '/deconnexion',
        element: <HomePage />,
      },
      /* Foster Routes */
      {
        path: '/famille/inscription',
        element: <FosterSignIn />,
      },
      {
        path: '/famille/profil/demandes',
        element: <FosterRequest />,
      },
      {
        path: '/famille/profil',
        element: <FosterProfile />,
      },
/*       {
        path: '/famille/profil/delete',
        element: <FosterDelete ?> />,
      }, */
      /* Shelter Routes */
      {
        path: '/association/inscription',
        element: <ShelterSignIn />,
      },
/*       {
        path: '/association/profil/delete',
        element: <ShelterDelete />,
      }, */
      {
        path: '/associations/profil',
        element: <ShelterDashboard />,
      },
      {
        path: '/associations/profil/logo',
        element: <ShelterUploadPage />,
      },
      {
        path: '/associations/profil/demandes/:demandeId',
        element: <ShelterRequestDetails />,
      },
      {
        path: '/associations/profil/demandes',
        element: <ShelterRequestList />,
      },
      {
        path: '/associations/profil/animaux/:animalId',
        element: <ShelterResidentDetails />,
      },
      {
        path: '/associations/profil/animaux',
        element: <ShelterResidentList />,
      },
      {
        path: '/associations/profil/animaux/suivi',
        element: <ShelterResidentProfileList />,
      },
      {
        path: '/associations/profil/animaux/nouveau-profil',
        element: <ShelterResidentAddProfile />,
      }
    ],
  },
]);

export default router;
