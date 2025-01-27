import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import UserContextProvider from './contexts/UserContext';

import './index.css';

import router from './routes/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
)
