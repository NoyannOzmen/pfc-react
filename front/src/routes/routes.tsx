import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FosterRoute, ShelterRoute } from "./PrivateRoute";
import UserContextProvider from '../contexts/UserContext.tsx';
import RootContextProvider from "../contexts/RootContext.tsx";

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

import FosterProfile from '../components/App/Foster/FosterProfile.tsx';
import FosterRequest from '../components/App/Foster/FosterRequest.tsx';

import ShelterDashboard from '../components/App/Shelter/ShelterDashboard.tsx';
import ShelterRequestDetails from '../components/App/Shelter/ShelterRequestDetails.tsx';
import ShelterRequestList from '../components/App/Shelter/ShelterRequestList.tsx';
import ShelterResidentAddProfile from '../components/App/Shelter/ShelterResidentAddProfile.tsx';
import ShelterResidentDetails from '../components/App/Shelter/ShelterResidentDetails.tsx';
import ShelterResidentList from '../components/App/Shelter/ShelterResidentList.tsx';
import ShelterResidentProfileList from '../components/App/Shelter/ShelterResidentProfileList.tsx';
import ShelterUploadPage from '../components/App/Shelter/ShelterUploadPage.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <RootContextProvider>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path= 'a-propos' element={<APropos />} />
            <Route path= 'contact' element={<Contact />} />
            <Route path= 'faq' element={<Faq />} />
            <Route path= 'infos-legales' element={<InfosLegales />} />
            <Route path= 'rgpd' element={<Rgpd />} />
            <Route path= 'devenir-famille-d-accueil' element={<DevenirFamille />} />
            <Route path= 'Plan' element={<Plan />} />
            {/* Shelter Routes */}
            <Route path= 'associations' element={<ShelterList />} />
            <Route path= 'associations/:shelterId' element={<ShelterDetails />} />
            {/* Animal Routes */}
            <Route path= 'animaux' element={<AnimalList />} />
            <Route path= 'animaux/:animalId' element={<AnimalDetails />} />
            {/* Session Routes */}
            <Route path= 'connexion' element={<Login />} />
            {/* Foster Routes */}
            <Route path='famille/inscription' element={<FosterSignIn />} />
            <Route element={<FosterRoute />}>
              <Route path='famille/profil' element={<FosterProfile />} />
              <Route path= 'famille/profil/demandes' element={<FosterRequest />} />
            </Route>
            {/* Shelter Routes */}
            <Route path= 'association/inscription' element={<ShelterSignIn />} />
            <Route element={<ShelterRoute />}>
              <Route path= 'associations/profil' element={<ShelterDashboard />} />
              <Route path= 'associations/profil/logo' element={<ShelterUploadPage />} />
              <Route path= 'associations/profil/animaux' element={<ShelterResidentList />} />
              <Route path= 'associations/profil/animaux/suivi' element={<ShelterResidentProfileList />} />
              <Route path= 'associations/profil/animaux/nouveau-profil' element={<ShelterResidentAddProfile />} />
              <Route path= 'associations/profil/animaux/:animalId' element={<ShelterResidentDetails />} />
              <Route path= 'associations/profil/demandes' element={<ShelterRequestList />} />
              <Route path= 'associations/profil/demandes/:demandeId' element={<ShelterRequestDetails />} />
            </Route>
            <Route path= '*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
      </RootContextProvider>
    </BrowserRouter>
  );
};

export default App;