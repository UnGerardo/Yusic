import Queue from "./components/Queue";
import TrackList from "./components/TrackList";
import styled from "styled-components";
import { TrackHeader } from "./components/TrackHeader";
import { BottomPanel } from "./components/BottomPanel";
import { SidePanel } from "./components/SidePanel";
import { ActionBar } from "./components/ActionBar";
import { scrollbar } from "./assets/Misc.styled";

const App = (): JSX.Element => (
  <>
    <AppContainer>
      <SidePanel />
      <Main>
        <ActionBar />
        <TrackHeader />
        <TrackList />
      </Main>
      <Queue />
    </AppContainer>
    <BottomPanel />
  </>
);

export default App;

const AppContainer = styled.section`
  display: flex;
  height: 100%;
  background-color: black;
  overflow: hidden;
  position: relative;
`;

const Main = styled.main`
  ${scrollbar};

  height: 100%;
  width: 100%;
`;