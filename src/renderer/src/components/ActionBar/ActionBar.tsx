import styled from "styled-components";
import SearchQuery from "./SearchQuery";

const ActionBar = (): JSX.Element => (
  <StyledActionBar>
    <SearchQuery />
  </StyledActionBar>
);

export default ActionBar;

const StyledActionBar = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;