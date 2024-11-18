import styled from "styled-components";
import SearchQuery from "./SearchQuery";
import Shuffle from "./Shuffle";

export const ActionBar = (): JSX.Element => (
  <Bar>
    <SearchQuery />
    <Shuffle />
  </Bar>
);

const Bar = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;