import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Setting from "../../../classes/Setting";
import { BigIcon, Slider } from "@renderer/assets/Misc.styled";
import { BackgroundImageContext } from "@renderer/contexts/BackgroundImageContext";
import { BackgroundImageOpacityContext } from "@renderer/contexts/BackgroundImageOpacity";
import { debounce } from "@renderer/utils/debounce";

export const Settings = (): JSX.Element => {
  const { setBackgroundImage } = useContext(BackgroundImageContext);
  const { backgroundImageOpacity, setBackgroundImageOpacity } = useContext(BackgroundImageOpacityContext);
  const [isOpen, setisOpen] = useState(false);

  const $menuRef = useRef(null);

  useEffect(() => {
    window.databaseApi.getAppSettings().then((settings: Setting[]) => {
      const settingHandlers = {
        'bg-image': setBackgroundImage,
        'bg-image-opacity': setBackgroundImageOpacity,
      }

    });

    document.addEventListener('mousedown', closeSettings);

    return () => {
      document.removeEventListener('mousedown', closeSettings);
    }
  }, []);


  const closeSettings = (event): void => {
    const menu = $menuRef.current as unknown as HTMLElement;
    if (menu && !menu.contains(event.target)) {
      setisOpen(false);
    }
  }

  const changeBackgroundImage = (event): void => {
    const filePath: string = event.target.files[0].path;
    const sanitizedPath = encodeURI(filePath).replaceAll('%5C', '/').replace('%3A', ':');
    setBackgroundImage(sanitizedPath);
    window.databaseApi.setAppSetting('bg-image', sanitizedPath);
  }

  const saveBgImgOpacityToDb = useCallback(
    debounce((opacity: number) => {
      window.databaseApi.setAppSetting('bg-image-opacity', `${opacity}`);
    }, 1000), []
  );

  const changeBackgroundImageOpacity = (event): void => {
    setBackgroundImageOpacity(event.target.value);
    saveBgImgOpacityToDb(event.target.value);
  }

  return (
    <SettingsContainer>
      <BigIcon>
        <SettingsIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
        </SettingsIcon>
      </BigIcon>
      {isOpen &&
        <SettingsMenu ref={$menuRef}>
          <Option>
            <label htmlFor="bg-image">Background Image:</label>
            <input type="file" name="bg-image" onChange={changeBackgroundImage} accept="image/*"/>
          </Option>
          <Option>
            <label htmlFor="bg-opactiy">BG Image Opacity:</label>
            <Slider type="range" name="bg-opacity" onChange={changeBackgroundImageOpacity} value={backgroundImageOpacity} max={1} step={0.01} />
          </Option>
        </SettingsMenu>
      }
    </SettingsContainer>
  );
}

const SettingsContainer = styled.section`
  position: relative;
  display: inline-block;
  user-select: none;
`;

const SettingsIcon = styled.svg`
  fill: #fff;
  position: relative;
`;

const SettingsMenu = styled.ul`
  background-color: black;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 10px;
  margin: 0;
  position: absolute;
  top: 50px;
  left: -120px;
  width: 300px;
  z-index: 100;
`;

const Option = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
`;