import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Setting from '../../classes/Setting';
import { BottomPanel } from "./components/BottomPanel";
import LibraryPanel from "./components/LibraryPanel/LibraryPanel";
import { ActionBar } from "./components/ActionBar/ActionBar";
import { BackgroundColorContext } from "./contexts/BackgroundColorContext";
import { BackgroundImageContext } from "./contexts/BackgroundImageContext";
import { BackgroundImageOpacityContext } from "./contexts/BackgroundImageOpacity";
import Settings from "./components/Settings/Settings";
import QueueDnd from "./components/Queue/Queue";
import ReactTrack from "./react-classes/ReactTrack";
import FocusMode from "./components/FocusMode/FocusMode";

export async function loader() {
  const playlists = await window.databaseApi.getPlaylists();
  const tracks = await window.databaseApi.getAllMusicFiles() as ReactTrack[];
  const reactTracks = tracks.map(track => new ReactTrack(track));
  return { playlists, tracks: reactTracks };
}

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'new-playlist') {
    const name = formData.get('name');
    await window.databaseApi.createPlaylist(name);
    return null;
  } else if (action === 'add-tracks') {
    const filePath = formData.get('file') as string;

    if (!filePath || filePath.length === 0) {
      alert('No file selected.');
    } else {
      await window.databaseApi.addTracks(filePath)
    }

    return null;
  }
  alert(`Unknown form action: ${action}`);
  return null;
}

const App = (): JSX.Element => {
  const [settingsOpacity, setSettingsOpacity] = useState(0);
  const [settingsScale, setSettingsScale] = useState(.7);
  const [settingsZIndex, setSettingsZIndex] = useState(-1);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [contentScale, setContentScale] = useState(1);
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);
  const { backgroundColor, setBackgroundColor } = useContext(BackgroundColorContext);
  const { backgroundImage, setBackgroundImage } = useContext(BackgroundImageContext);
  const { backgroundImageOpacity, setBackgroundImageOpacity } = useContext(BackgroundImageOpacityContext);

  useEffect(() => {
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
          isFocusModeActive={isFocusModeActive}
        />
        <Content opacity={contentOpacity} scale={contentScale}>
          <LibraryPanel openSettings={openSettings} />
          <Main>
            <ActionBar />
            <Outlet />
          </Main>
          <QueueDnd />
        </Content>
        <Settings isSettingsActive={isSettingsActive} closeHandler={closeSettings} />
        <FocusMode isFocusModeActive={isFocusModeActive} closeFocusMode={closeFocusMode} />
      </AppContainer>
      <BottomPanel isFocusModeActive={isFocusModeActive} openFocusMode={openFocusMode} />
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

const BackgroundImage = styled.div<{ path: string, opacity: number, isFocusModeActive: boolean }>`
  content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: ${({ isFocusModeActive }) => isFocusModeActive ? '-100px' : 0};
  opacity: ${({isFocusModeActive, opacity}) => isFocusModeActive ? 1 : opacity};
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
  grid-template-rows: 50px 27px 1fr;
  height: 100%;
  width: 100%;
  z-index: 3;
`;