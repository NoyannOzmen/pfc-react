import { Outlet } from 'react-router-dom';

import Footer from '../components/App/Footer/Footer';
import Header from '../components/App/Header/Header';

function Root() {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
