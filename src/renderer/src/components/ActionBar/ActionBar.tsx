import styled from "styled-components";
import SearchQuery from "./SearchQuery";
import Shuffle from "./Shuffle";

const ActionBar = (): JSX.Element => (
  <StyledActionBar>
    <SearchQuery />
    <Shuffle />
  </StyledActionBar>
);

export default ActionBar;

const StyledActionBar = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;