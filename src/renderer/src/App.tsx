import { useContext } from "react";
import { BackgroundColorContext } from "./contexts/BackgroundColorContext";
import styled from "styled-components";
import Queue from "./components/Queue";
import TrackList from "./components/TrackList";
import { TrackHeader } from "./components/TrackHeader";
import { BottomPanel } from "./components/BottomPanel";
import { SidePanel } from "./components/SidePanel";
import { ActionBar } from "./components/ActionBar";

const App = (): JSX.Element => {
  const { backgroundColor } = useContext(BackgroundColorContext);

  return (
    <>
      <AppContainer backgroundColor={backgroundColor}>
        <BackgroundImage path=""/>
        <SidePanel />
        <Main>
          <ActionBar />
          <TrackHeader />
          <div>
            <TrackList />
          </div>
        </Main>
        <Queue />
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
`;

const BackgroundImage = styled.div<{ path: string }>`
  content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.15;
  background-image: ${props => `url(${props.path})`};
  background-size: cover;
  background-position: center;
  user-select: none;
  pointer-events: none;
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: 50px 27px 1fr;

  height: 100%;
  width: 100%;
`;