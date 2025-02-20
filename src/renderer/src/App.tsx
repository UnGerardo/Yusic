import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Setting from '../../classes/Setting';
import Player from "./components/Player/Player";
import LibraryPanel from "./components/LibraryPanel/LibraryPanel";
import ActionBar from "./components/ActionBar/ActionBar";
import { BackgroundColorContext } from "./contexts/BackgroundColorContext";
import { BackgroundImageContext } from "./contexts/BackgroundImageContext";
import { BackgroundImageOpacityContext } from "./contexts/BackgroundImageOpacity";
import Settings from "./components/Settings/Settings";
import QueueDnd from "./components/Queue/Queue";
import ReactTrack from "./react-classes/ReactTrack";
import FocusMode from "./components/FocusMode/FocusMode";
import TrackList from "./components/TrackList";
import { TracksContext } from "./contexts/TracksContext";
import { PlaylistsContext } from "./contexts/PlaylistsContext";
import { TrackMapContext } from "./contexts/TrackMapContext";

const App = (): JSX.Element => {
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [contentScale, setContentScale] = useState(1);
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);
  const { setTracks } = useContext(TracksContext);
  const { setTrackMap } = useContext(TrackMapContext);
  const { setPlaylists } = useContext(PlaylistsContext);
  const { backgroundColor, setBackgroundColor } = useContext(BackgroundColorContext);
  const { backgroundImage, setBackgroundImage } = useContext(BackgroundImageContext);
  const { backgroundImageOpacity, setBackgroundImageOpacity } = useContext(BackgroundImageOpacityContext);

  useEffect(() => {
    window.databaseApi.getAllMusicFiles().then((tracks: ReactTrack[]) => {
      setTracks(tracks.map(track => new ReactTrack(track)));
      setTrackMap(tracks.reduce((map, track) => {
        map[track.id] = track;
        return map;
      }, {} as Record<number, ReactTrack>))
    });
    window.databaseApi.getPlaylists().then((playlists: object) => {
      setPlaylists(playlists);
    })

    window.databaseApi.getAppSettings().then((settings: Setting[]) => {
      const settingHandlers = {
        'bg-color': setBackgroundColor,
        'bg-image': setBackgroundImage,
        'bg-image-opacity': setBackgroundImageOpacity,
      }

      for (const setting of settings) {
        settingHandlers[setting.name](setting.value);
      }
    });
  }, []);

  const openSettings = (): void => {
    showSettings();
    hideContent();
  }

  const closeSettings = (): void => {
    hideSettings();
    showContent();
  }

  const openFocusMode = (): void => {
    hideContent();
    showFocusMode();
  }

  const closeFocusMode = (): void => {
    showContent();
    hideFocusMode();
  }

  return (
    <>
      <AppContainer backgroundColor={backgroundColor}>
        <BackgroundImage
          path={backgroundImage}
          opacity={backgroundImageOpacity}
          inFocus={isFocusModeActive}
        />
        <Content opacity={contentOpacity} scale={contentScale}>
          <LibraryPanel openSettings={openSettings} />
          <Main>
            <ActionBar />
            <TrackList />
          </Main>
          <QueueDnd />
        </Content>
        <Settings isActive={isSettingsActive} closeHandler={closeSettings} />
        <FocusMode inFocus={isFocusModeActive} closeHandler={closeFocusMode} />
      </AppContainer>
      <Player inFocus={isFocusModeActive} openFocusMode={openFocusMode} />
    </>
  );

  function showContent(): void {
    setContentOpacity(1);
    setContentScale(1);
  }
  function hideContent(): void {
    setContentOpacity(0);
    setContentScale(.7);
  }
  function showSettings(): void {
    setIsSettingsActive(true);
  }
  function hideSettings(): void {
    setIsSettingsActive(false);
  }
  function showFocusMode(): void {
    setIsSettingsActive(false);
    setIsFocusModeActive(true);
  }
  function hideFocusMode(): void {
    setIsFocusModeActive(false);
  }
}
export default App;

const AppContainer = styled.section<{ backgroundColor: string }>`
  display: flex;
  height: 100%;
  background-color: ${props => props.backgroundColor};
  overflow: visible;
  position: relative;
  z-index: 1;
`;

const BackgroundImage = styled.div<{ path: string, opacity: number, inFocus: boolean }>`
  content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: ${({inFocus}) => inFocus ? '-100px' : 0};
  opacity: ${({inFocus, opacity}) => inFocus ? 1 : opacity};
  background-image: ${props => `url("${props.path}")`};
  background-size: cover;
  background-position: center;
  user-select: none;
  pointer-events: none;
  transition: 0.5s;
  z-index: 2;
`;

const Content = styled.section<{ opacity: number, scale: number }>`
  display: flex;
  opacity: ${props => props.opacity};
  overflow: hidden;
  height: 100%;
  width: 100%;
  transition: 0.3s;
  transform: scale(${props => props.scale});
  z-index: 3;
`

const Main = styled.main`
  display: grid;
  grid-template-rows: 50px 1fr;
  height: 100%;
  width: 100%;
  z-index: 3;
`;