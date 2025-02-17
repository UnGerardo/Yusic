import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { AudioSourceProvider } from "@contexts/AudioSourceContext";
import { QueueProvider } from "@contexts/QueueContext";
import { PlayingTrackProvider } from "@contexts/PlayingTrackContext";
import { SearchQueryProvider } from './contexts/SearchQueryContext';
import { BackgroundColorProvider } from './contexts/BackgroundColorContext';
import { BackgroundImageProvider } from './contexts/BackgroundImageContext';
import { BackgroundImageOpacityProvider } from './contexts/BackgroundImageOpacity';

import { FocusModeHoverProvider } from './contexts/FocusModeHoverContext';
import { PlaylistIdProvider } from './contexts/PlaylistIdContext';
import { PlayerTimeProvider } from './contexts/PlayerTimeContext';
import App from './App';
import { TracksProvider } from './contexts/TracksContext';
import { PlaylistsProvider } from './contexts/PlaylistsContext';
// import ArtistList from './components/ArtistList';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AudioSourceProvider>
      <QueueProvider>
        <PlayingTrackProvider>
          <SearchQueryProvider>
            <BackgroundColorProvider>
              <BackgroundImageProvider>
                <BackgroundImageOpacityProvider>
                  <FocusModeHoverProvider>
                    <PlaylistIdProvider>
                      <PlayerTimeProvider>
                        <TracksProvider>
                          <PlaylistsProvider>
                            <App />
                          </PlaylistsProvider>
                        </TracksProvider>
                      </PlayerTimeProvider>
                    </PlaylistIdProvider>
                  </FocusModeHoverProvider>
                </BackgroundImageOpacityProvider>
              </BackgroundImageProvider>
            </BackgroundColorProvider>
          </SearchQueryProvider>
        </PlayingTrackProvider>
      </QueueProvider>
    </AudioSourceProvider>
  </React.StrictMode>
);
