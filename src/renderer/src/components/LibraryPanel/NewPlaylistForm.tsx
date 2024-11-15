import { Form } from "react-router-dom";
import styled from "styled-components";

const NewPlaylistForm = (): JSX.Element => {

  return (
    <StyledNewPlaylistForm method="post">
      <input type="hidden" name="action" value='new-playlist' />
      <PlaylistInput name="name" type="text" placeholder="Playlist name..." required />
      <button type="submit">Create</button>
    </StyledNewPlaylistForm>
  );
}

export default NewPlaylistForm;

const StyledNewPlaylistForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlaylistInput = styled.input`
  width: 90%;
`;