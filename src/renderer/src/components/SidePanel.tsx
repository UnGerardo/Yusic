import Playlist from "@classes/Playlist";
import { WindowList } from "@renderer/assets/Misc.styled";
import React from "react";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  await window.databaseApi.createPlaylist(name);
  return null;
}

export const SidePanel = React.memo((): JSX.Element => {
  const playlists = useRouteLoaderData('root') as Playlist[];

  return (
    <Panel>
      <Group to={'/'}>Tracks</Group>
      <Group to={'/artists'}>Artists</Group>
      <Group to={'/albums'}>Ablum</Group>
      <Form method="post">
        <PlaylistInput name="name" type="text" placeholder="Playlist name..." required />
        <button type="submit">Create</button>
      </Form>
      <PlaylistContainer>
        <AutoSizer>
          {({ height, width }) => (
            <WindowList
              height={height}
              itemCount={playlists.length}
              itemSize={30}
              width={width}
              style={{ overflowX: 'hidden' }}
            >
              {({ index, style }) => (
                <Group
                  key={playlists[index]?.id}
                  to={`/playlist/${playlists[index]?.id}`}
                  style={style}
                >
                  {playlists[index]?.name}
                </Group>
              )}
            </WindowList>
          )}
        </AutoSizer>
      </PlaylistContainer>
    </Panel>
  );
});

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
  /* padding: 10px 0; */
  height: 30px;
  width: 100%;
  text-decoration: none;
`;

const PlaylistInput = styled.input`
  width: 90%;
`;

const PlaylistContainer = styled.div`
  flex: 1;
  width: 100%;
`;