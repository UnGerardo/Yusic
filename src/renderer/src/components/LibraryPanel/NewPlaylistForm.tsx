import { useState } from "react";
import styled from "styled-components";

const NewPlaylistForm = (): JSX.Element => {
  const [input, setInput] = useState('');

  return (
    <StyledNewPlaylistForm method="post" onSubmit={() => setInput('')}>
      <PlaylistInput value={input} onChange={(event) => setInput(event.target.value)} name="name" type="text" placeholder="New Playlist..." required />
      <AddPlaylist type="submit">+</AddPlaylist>
      <input type="hidden" name="action" value='new-playlist' />
    </StyledNewPlaylistForm>
  );
}

export default NewPlaylistForm;

const PlaylistInput = styled.input`
  background: none;
  border: none;
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const AddPlaylist = styled.button`
  background: none;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  padding: 0;
`;

const StyledNewPlaylistForm = styled.form`
  background: none;
  border: 1px solid black;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 102px 21px;
  padding: 5px;
  margin: 10px;
  width: 90%;
  user-select: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border-color: #666;

    & ${AddPlaylist} {
      border-color: #666;
    }
  }

  &:has(${PlaylistInput}:focus) {
    border-color: white;

    & ${AddPlaylist} {
      border-color: white;
    }
  }
`;