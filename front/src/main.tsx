import ReactDOM from 'react-dom/client';

import './index.css';

import App from './routes/App';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
