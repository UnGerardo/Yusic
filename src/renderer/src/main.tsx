import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { TracksProvider } from "@contexts/TracksContext";
import { AudioSourceProvider } from "@contexts/AudioSourceContext";
import { QueueProvider } from "@contexts/QueueContext";
import { PlayingTrackProvider } from "@contexts/PlayingTrackContext";
import { SearchQueryProvider } from './contexts/SearchQueryContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <AudioSourceProvider>
    <QueueProvider>
      <PlayingTrackProvider>
        <TracksProvider>
          <SearchQueryProvider>
            <App />
          </SearchQueryProvider>
        </TracksProvider>
      </PlayingTrackProvider>
    </QueueProvider>
  </AudioSourceProvider>
  </React.StrictMode>
);
