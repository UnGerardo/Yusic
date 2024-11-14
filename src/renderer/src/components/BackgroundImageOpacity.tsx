import { Slider, StyledSetting } from "@renderer/assets/Misc.styled";
import { BackgroundImageOpacityContext } from "@renderer/contexts/BackgroundImageOpacity"
import { debounce } from "@renderer/utils/debounce";
import { useCallback, useContext } from "react";
import styled from "styled-components";

const BackgroundImageOpacity = (): JSX.Element => {
  const { backgroundImageOpacity, setBackgroundImageOpacity } = useContext(BackgroundImageOpacityContext);

  const saveBgImgOpacityToDb = useCallback(
    debounce((opacity: number) => {
      window.databaseApi.setAppSetting('bg-image-opacity', `${opacity}`);
    }, 1000), []
  );

  const changeBackgroundImageOpacity = (event): void => {
    setBackgroundImageOpacity(event.target.value);
    saveBgImgOpacityToDb(event.target.value);
  };

  return (
    <StyledSetting>
      <label htmlFor="bg-opactiy">BG Image Opacity:</label>
      <OpacitySlider type="range" name="bg-opacity" onChange={changeBackgroundImageOpacity} value={backgroundImageOpacity} max={1} step={0.01} />
    </StyledSetting>
  );
}

export default BackgroundImageOpacity;

const OpacitySlider = styled(Slider)`
  width: 100px;
`;