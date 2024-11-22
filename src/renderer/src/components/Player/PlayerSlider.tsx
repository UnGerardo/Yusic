import styled from "styled-components";

import formatSeconds from "@renderer/utils/formatSeconds";
import { Slider } from "@renderer/assets/Misc.styled";

const PlayerSlider = (
  {
    currentTime,
    maxTime,
    changeHandler,
    mouseUpHandler
  }: {
    currentTime: number,
    maxTime: number,
    changeHandler: (e) => void,
    mouseUpHandler: (e) => void
  }): JSX.Element => {

  return (
    <SliderSection>
      <SliderTimes>{formatSeconds(currentTime)}</SliderTimes>
      <Slider title="" type="range" onChange={changeHandler} onMouseUp={mouseUpHandler} value={currentTime} max={maxTime}/>
      <SliderTimes>{formatSeconds(maxTime)}</SliderTimes>
    </SliderSection>
  );
}

export default PlayerSlider;

const SliderSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SliderTimes = styled.span`
  color: #a5a5a5;
  font-size: 14px;
  margin: 0 5px;
  user-select: none;
`;