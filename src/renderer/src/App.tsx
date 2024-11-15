import { useContext, useEffect, useState } from "react";
import { BackgroundColorContext } from "./contexts/BackgroundColorContext";
import styled from "styled-components";

import Queue from "./components/Queue";
import Setting from '../../classes/Setting';
import { BottomPanel } from "./components/BottomPanel";
import { SidePanel } from "./components/SidePanel";
import { ActionBar } from "./components/ActionBar";
import { BackgroundImageContext } from "./contexts/BackgroundImageContext";
import { BackgroundImageOpacityContext } from "./contexts/BackgroundImageOpacity";
import { Outlet } from "react-router-dom";
import Settings from "./components/Settings/Settings";

export async function loader() {
  const playlists = await window.databaseApi.getPlaylists();
  const tracks = await window.databaseApi.getAllMusicFiles();
  return { playlists, tracks };
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
  const [settingsDisplay, setSettingsDisplay] = useState('none');
  const [contentDisplay, setContentDisplay] = useState('flex');
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
    setSettingsDisplay('flex');
    setContentDisplay('none');
  }

  const closeSettings = (): void => {
    setSettingsDisplay('none');
    setContentDisplay('flex');
  }

  return (
    <>
      <AppContainer backgroundColor={backgroundColor}>
        <BackgroundImage path={backgroundImage} opacity={backgroundImageOpacity} />
        <Content display={contentDisplay} >
          <SidePanel openSettings={openSettings} />
          <Main>
            <ActionBar />
            <Outlet />
          </Main>
          <Queue />
        </Content>
        <Settings display={settingsDisplay} closeHandler={closeSettings} />
      </AppContainer>
      <BottomPanel />
    </>
  );
}
export default App;

const AppContainer = styled.section<{ backgroundColor: string }>`
  display: flex;
  height: 100%;
  background-color: ${props => props.backgroundColor};
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const BackgroundImage = styled.div<{ path: string, opacity: number }>`
  content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: ${props => props.opacity};
  background-image: ${props => `url("${props.path}")`};
  background-size: cover;
  background-position: center;
  user-select: none;
  pointer-events: none;
  z-index: 2;
`;

const Content = styled.section<{ display: string }>`
  display: ${props => props.display};
  overflow: hidden;
  height: 100%;
  width: 100%;
`

const Main = styled.main`
  display: grid;
  grid-template-rows: 50px 27px 1fr;
  height: 100%;
  width: 100%;
  z-index: 3;
`;