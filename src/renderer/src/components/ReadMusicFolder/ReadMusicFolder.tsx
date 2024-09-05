import { useContext } from "react";

import Track from "@classes/Track";
import addFolderIcon from '@resources/icons/add-folder.svg';

import { TracksContext } from "../TracksContext/TracksContext";

const ReadMusicFolder = () => {
  const { tracks, setTracks } = useContext(TracksContext);

  const readFolder = async (): Promise<void> => {
    const filePaths: Array<string> = await window.dirApi.readDir();

    if (filePaths.length === 0) {
      alert('No files found.');
      return;
    }

    let newTracks: Track[] = [];

    for (const filePath of filePaths) {
      newTracks.push(await window.musicMetadataApi.getTrackInfo(filePath));
    }

    setTracks([ ...tracks, ...newTracks]);
    await window.databaseApi.writeMusicFiles(newTracks);
  }

  return (
    <div className="icon-big">
      <img src={addFolderIcon} onClick={readFolder} />
    </div>
  )
}

export default ReadMusicFolder;