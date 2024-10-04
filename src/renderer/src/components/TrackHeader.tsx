import React from "react";
import styled from "styled-components";

const TrackHeader = React.memo((): JSX.Element => (
  <Header>
    <p>Image</p>
    <p>Title & Artist</p>
    <Album>Album</Album>
    <Duration>Time</Duration>
  </Header>
));

export default TrackHeader;

const Header = styled.section`
  display: grid;
  grid-template-columns: 80px 2fr 2fr 1fr 20px 0.3fr;
  align-items: center;
  margin: 0 10px 0;
  border-bottom: 1px gray solid;

  @media (max-width: 920px) {
    grid-template-columns: 60px 2fr 1fr 20px 0.3fr;
  }

  @media (max-width: 820px) {
    grid-template-columns: 50px 1fr 20px 0.3fr;
  }
`;

const Album = styled.p`
  @media (max-width: 920px) {
    display: none;
  }
`;

const Duration = styled.p`
  @media (max-width: 820px) {
    display: none;
  }
`;