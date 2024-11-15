import { Form } from "react-router-dom";
import { useRef } from "react";
import { StyledSetting } from "@renderer/assets/Misc.styled";

const ReadMusicFolder = () => {
  const $dirInput = useRef<HTMLInputElement>(null);
  const $submit = useRef<HTMLButtonElement>(null);

  const selectDir = async () => {
    $dirInput.current!.value = await window.api.selectDir();
    $submit.current!.click();
  }

  return (
    <StyledSetting>
      <label htmlFor="select-folder">Add New Tracks:</label>
      <button name="select-folder" onClick={selectDir}>
        Select Folder
      </button>
      <Form method="post" encType="multipart/form-data" hidden>
        <input type="hidden" name="action" value='add-tracks'/>
        <input ref={$dirInput} type="text" name="file"/>
        <button ref={$submit} type="submit"></button>
      </Form>
    </StyledSetting>
  );
}

export default ReadMusicFolder;
