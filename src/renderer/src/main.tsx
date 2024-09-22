import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { TracksProvider } from "@contexts/TracksContext";
import { AudioSourceProvider } from "@contexts/AudioSourceContext";
import { QueueProvider } from "@contexts/QueueContext";
import { PlayingTrackProvider } from "@contexts/PlayingTrackContext";
import { SearchQueryProvider } from './contexts/SearchQueryContext';
import { BackgroundColorProvider } from './contexts/BackgroundColorContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AudioSourceProvider>
      <QueueProvider>
        <PlayingTrackProvider>
          <TracksProvider>
            <SearchQueryProvider>
              <BackgroundColorProvider>
                <App />
              </BackgroundColorProvider>
            </SearchQueryProvider>
          </TracksProvider>
        </PlayingTrackProvider>
      </QueueProvider>
    </AudioSourceProvider>
  </React.StrictMode>
);
