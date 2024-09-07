import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { TracksProvider } from './components/TracksContext/TracksContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TracksProvider>
      <App />
    </TracksProvider>
  </React.StrictMode>
);
