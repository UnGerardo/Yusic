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
import { BackgroundImageProvider } from './contexts/BackgroundImageContext';
import { BackgroundImageOpacityProvider } from './contexts/BackgroundImageOpacity';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import TrackList from './components/TrackList';

const router = createMemoryRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Something went wrong.</div>,
    children: [
      {
        path: '/',
        element: <TrackList />,
        errorElement: <div>Something went wrong.</div>,
      },
      {
        path: '/artists',
        element: <div>ARTISTS</div>,
        errorElement: <div>Something went wrong.</div>,
      },
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
