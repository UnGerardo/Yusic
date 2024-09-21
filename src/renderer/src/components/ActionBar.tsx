import styled from "styled-components";
import ReadMusicFolder from "./ReadMusicFolder";
import SearchQuery from "./SearchQuery";
import Shuffle from "./Shuffle";
import { Settings } from "./Settings";
import { ClearQueue } from "./ClearQueue";

export const ActionBar = (): JSX.Element => (
  <Bar>
    <Settings />
    <ReadMusicFolder />
    <SearchQuery />
    <Shuffle />
    <ClearQueue />
  </Bar>
);

const Bar = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;