import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidePanel = React.memo((): JSX.Element => (
  <Panel>
    <Group to={'/'}>Tracks</Group>
    <Group to={'/artists'}>Artists</Group>
    <Group to={'/albums'}>Ablum</Group>
  </Panel>
));

const Panel = styled.section`
  border-right: 1px white solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 10%;
  max-width: 200px;
  z-index: 3;
`;

const Group = styled(Link)`
  border-bottom: 1px white solid;
  color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0;
  width: 100%;
  text-decoration: none;
`;