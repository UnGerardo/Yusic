import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsApp from './SettingsApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SettingsApp />
  </React.StrictMode>
)