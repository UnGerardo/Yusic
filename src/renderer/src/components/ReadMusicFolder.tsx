import { useContext } from "react";

import Track from "@classes/Track";

import { TracksContext } from "@contexts/TracksContext";
import { BigIcon } from "@renderer/assets/Misc.styled";
import styled from "styled-components";

const ReadMusicFolder = () => {
  const { setTracks } = useContext(TracksContext);

  const readFolder = async (): Promise<void> => {
    const filePaths: string[] = await window.dirApi.readDir();

    if (filePaths.length === 0) return alert('No files found.');

    const newTracks: Track[] = [];
    for (const filePath of filePaths) {
      newTracks.push(await window.musicMetadataApi.getTrackInfo(filePath));
    }

    await window.databaseApi.writeMusicFiles(newTracks);
    const allFiles = await window.databaseApi.getAllMusicFiles();
    setTracks(allFiles);
  }

  return (
    <BigIcon onClick={readFolder}>
      <FolderIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 35">
        <path d="M17.8,33.5c2.29-2.11,3.7-5.13,3.7-8.47,0-6.34-5.16-11.5-11.5-11.5-3.35,0-6.39,1.43-8.5,3.74V2.02c0-.29.23-.52.52-.52h20.96c.16,0,.27.08.34.14l.04.04,4.45,4.82h20.09c.33,0,.59.27.59.59v25.82c0,.33-.27.59-.59.59h-30.11Z"/>
        <path d="M22.54,3l3.73,4.04.89.96h19.84v24h-26.01c1.28-2.02,2.01-4.41,2.01-6.97,0-7.17-5.83-13-13-13-2.57,0-4.97.74-7,2.04V3h19.54M22.98,0H2.02C.9,0,0,.9,0,2.02v21.98s.04-.04.06-.06c.54-5.01,4.78-8.91,9.94-8.91,5.52,0,10,4.48,10,10,0,5.18-3.93,9.43-8.97,9.95,0,0-.02.02-.03.03h36.91c1.16,0,2.09-.94,2.09-2.09V7.09c0-1.16-.94-2.09-2.09-2.09h-19.43l-4-4.33s-.06-.07-.1-.11l-.04-.04h0c-.36-.32-.83-.52-1.35-.52h0Z"/>
        <polygon points="16 23.93 11.07 23.93 11.07 18.99 8.6 18.99 8.6 23.93 3.67 23.93 3.67 26.39 8.6 26.39 8.6 31.33 11.07 31.33 11.07 26.39 16 26.39 16 23.93"/>
      </FolderIcon>
    </BigIcon>
  )
}

export default ReadMusicFolder;

const FolderIcon = styled.svg`
  path {
    fill: #fff;
    stroke: #fff;
    stroke-width: 1px;
  }

  polygon {
    fill: #fff;
    stroke-width: 1px;
  }
`;