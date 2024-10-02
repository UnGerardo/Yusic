import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App, { loader as appLoader } from './App';
import { TracksProvider } from "@contexts/TracksContext";
import { AudioSourceProvider } from "@contexts/AudioSourceContext";
import { QueueProvider } from "@contexts/QueueContext";
import { PlayingTrackProvider } from "@contexts/PlayingTrackContext";
import { SearchQueryProvider } from './contexts/SearchQueryContext';
import { BackgroundColorProvider } from './contexts/BackgroundColorContext';
import { BackgroundImageProvider } from './contexts/BackgroundImageContext';
import { BackgroundImageOpacityProvider } from './contexts/BackgroundImageOpacity';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import TrackList from './components/TrackList';
import { action as createPlaylistAction } from './components/SidePanel';
import ErrorPage from './components/ErrorPage';
// import ArtistList from './components/ArtistList';

const router = createMemoryRouter([
  {
    path: '/',
    id: 'root',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    action: createPlaylistAction,
    children: [
      {
        index: true,
        element: <TrackList />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/artists',
        element: <div>Artists</div>,
        // element: <ArtistList />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/playlist/:playlistId',
        element: <div>Playlist</div>,
        errorElement: <ErrorPage />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AudioSourceProvider>
      <QueueProvider>
        <PlayingTrackProvider>
          <TracksProvider>
            <SearchQueryProvider>
              <BackgroundColorProvider>
                <BackgroundImageProvider>
                  <BackgroundImageOpacityProvider>
                    <RouterProvider router={router} />
                  </BackgroundImageOpacityProvider>
                </BackgroundImageProvider>
              </BackgroundColorProvider>
            </SearchQueryProvider>
          </TracksProvider>
        </PlayingTrackProvider>
      </QueueProvider>
    </AudioSourceProvider>
  </React.StrictMode>
);
