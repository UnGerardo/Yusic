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
  border-bottom: 1px gray solid;
  display: grid;
  grid-template-columns: 80px 1fr 1fr 40px 18px 18px;
  align-items: center;
  gap: 20px;
  padding: 0 20px 5px 5px;
  margin: 0 10px;

  @media (max-width: 920px) {
    grid-template-columns: 60px 1fr 40px 18px 18px;
  }

  @media (max-width: 820px) {
    grid-template-columns: 50px 1fr 18px 18px;
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