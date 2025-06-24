import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FosterRoute, ShelterRoute } from "./PrivateRoute.tsx";
import UserContextProvider from '../contexts/UserContext.tsx';
import RootContextProvider from "../contexts/RootContext.tsx";
import { Root,ErrorPage,HomePage,APropos,Contact,Faq,InfosLegales,Rgpd,DevenirFamille,Plan,Login,ShelterDetails,ShelterList,AnimalList,AnimalDetails,Register,ShelterSignIn,FosterSignIn,FosterProfile,FosterRequest,ShelterDashboard,ShelterRequestDetails,ShelterRequestList,ShelterResidentAddProfile,ShelterResidentList,ShelterResidentDetails,ShelterResidentProfileList,ShelterUploadPage} from "./pages";

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
            <Route path= 'associations/:slug' element={<ShelterDetails />} />
            {/* Animal Routes */}
            <Route path= 'animaux' element={<AnimalList />} />
            <Route path= 'animaux/:slug' element={<AnimalDetails />} />
            {/* Session Routes */}
            <Route path= 'connexion' element={<Login />} />
            <Route path='inscription' element={<Register />} />
            {/* Logged Foster Routes */}
            <Route path='famille/inscription' element={<FosterSignIn />} />
            <Route element={<FosterRoute />}>
              <Route path='famille/profil' element={<FosterProfile />} />
              <Route path= 'famille/profil/demandes' element={<FosterRequest />} />
            </Route>
            {/* Logged Shelter Routes */}
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