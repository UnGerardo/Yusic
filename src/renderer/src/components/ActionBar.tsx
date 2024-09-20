import styled from "styled-components";
import ReadMusicFolder from "./ReadMusicFolder";
import SearchQuery from "./SearchQuery";
import Shuffle from "./Shuffle";

export const ActionBar = (): JSX.Element => (
  <Bar>
    <ReadMusicFolder />
    <SearchQuery />
    <Shuffle />
  </Bar>
);

const Bar = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;