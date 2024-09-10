import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { TracksProvider } from "@contexts/TracksContext";
import { AudioSourceProvider } from "@contexts/AudioSourceContext";
import { QueueProvider } from "@contexts/QueueContext";
import { PlayingTrackProvider } from "@contexts/PlayingTrackContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <AudioSourceProvider>
    <QueueProvider>
      <PlayingTrackProvider>
        <TracksProvider>
          <App />
        </TracksProvider>
      </PlayingTrackProvider>
    </QueueProvider>
  </AudioSourceProvider>
  </React.StrictMode>
);
