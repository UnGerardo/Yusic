import { useCallback, useContext } from "react";
import { StyledSetting } from "@renderer/assets/Misc.styled";
import { BackgroundColorContext } from "@renderer/contexts/BackgroundColorContext";
import { debounce } from "@renderer/utils/debounce";

const BackgroundColorSetting = (): JSX.Element => {
  const { backgroundColor, setBackgroundColor } = useContext(BackgroundColorContext);

  const saveBgColorToDb = useCallback(
    debounce((color: string) => {
      window.databaseApi.setAppSetting('bg-color', `${color}`);
    }, 1000), []
  );

  const changeBackgroundColor = (event): void => {
    setBackgroundColor(event.target.value);
    saveBgColorToDb(event.target.value);
  }

  return (
    <StyledSetting>
      <label htmlFor="background-color">Background Color:</label>
      <input type="color" name="background-color" value={backgroundColor} onChange={changeBackgroundColor}/>
    </StyledSetting>
  );
}

export default BackgroundColorSetting;