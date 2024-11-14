import { StyledSetting } from "@renderer/assets/Misc.styled";
import { BackgroundImageContext } from "@renderer/contexts/BackgroundImageContext"
import { debounce } from "@renderer/utils/debounce";
import { useCallback, useContext } from "react"
import styled from "styled-components";

const BackgroundImageSetting = (): JSX.Element => {
  const { setBackgroundImage } = useContext(BackgroundImageContext);

  const saveBGImageToDb = useCallback(
    debounce((sanitizedPath: string) => {
      window.databaseApi.setAppSetting('bg-image', sanitizedPath);
    }, 1000), []
  );

  const changeBackgroundImage = (event): void => {
    const filePath: string = event.target.files[0].path;
    const sanitizedPath = encodeURI(filePath).replaceAll('%5C', '/').replace('%3A', ':');
    setBackgroundImage(sanitizedPath);
    saveBGImageToDb(sanitizedPath);
  }

  return (
    <StyledSetting>
      <label htmlFor="bg-image">Background Image:</label>
      <BGImageInput type="file" name="bg-image" onChange={changeBackgroundImage} accept="image/*"/>
    </StyledSetting>
  );
}

export default BackgroundImageSetting;

const BGImageInput = styled.input`
  width: 88px;
`;