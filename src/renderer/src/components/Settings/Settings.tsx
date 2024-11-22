import styled from "styled-components";
import BackgroundColorSetting from "./BackgroundColorSetting";
import BackgroundImageSetting from "./BackgroundImageSetting";
import BackgroundImageOpacity from "./BackgroundImageOpacity";
import ReadMusicFolder from "./ReadMusicFolder";

const Settings = ({ isActive, closeHandler }: { isActive: boolean, closeHandler: () => void }): JSX.Element => {
  const inactiveScale = 0.7;
  const activeZIndex = 3;

  return (
    <StyledSettings
      opacity={isActive ? 1 : 0}
      scale={isActive ? 1 : inactiveScale}
      zIndex={isActive ? activeZIndex : -1}
    >
      <Header>
        <Title>Settings</Title>
        <CloseButton onClick={closeHandler} />
      </Header>
      <SettingsContainer>
        <SubHeader>Data</SubHeader>
        <ReadMusicFolder />
        <SubHeader>Appearence</SubHeader>
        <BackgroundColorSetting />
        <BackgroundImageSetting />
        <BackgroundImageOpacity />
      </SettingsContainer>
    </StyledSettings>
  )
}

export default Settings;

const StyledSettings = styled.section<{ opacity: number, scale: number, zIndex: number }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  opacity: ${(props) => props.opacity};
  position: absolute;
  top: 40px;
  left: 150px;
  right: 150px;
  transition: 0.3s;
  transform: scale(${props => props.scale});
  z-index: ${props => props.zIndex};
`;

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 30px 0;
  width: 100%;
`;

const SubHeader = styled.h2`
  font-size: 20px;
  margin-top: 20px;
`

const Title = styled.h1`
  font-size: 24px;
`;

const SettingsContainer = styled.section`
  width: 60%;
`;

const CloseButton = styled.button`
  background: none;
  border: 2px solid gray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  position: relative;
  transform: rotate(45deg);

  &:before {
    background-color: gray;
    content: '';
    height: 1px;
    width: 15px;
    position: absolute;
  }

  &:after {
    background-color: gray;
    content: '';
    height: 15px;
    width: 1px;
    position: absolute;
  }

  &:hover {
    border-color: white;
    transform: scale(1.05) rotate(45deg);
  }
  &:hover::after,
  &:hover::before { background-color: white; }

  &:active {
    border-color: #666;
    transform: scale(.95) rotate(45deg);
  }
  &:active::after,
  &:active::before { background-color: #666; }
`;