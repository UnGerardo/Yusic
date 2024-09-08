import { useContext } from "react";

import Track from "@classes/Track";
import addFolderIcon from '@resources/icons/add-folder.svg';

import { TracksContext } from "@contexts/TracksContext/TracksContext";

const ReadMusicFolder = () => {
  const { setTracks } = useContext(TracksContext);

  const readFolder = async (): Promise<void> => {
    const filePaths: string[] = await window.dirApi.readDir();

    if (filePaths.length === 0) {
      alert('No files found.');
      return;
    }

    const newTracks: Track[] = [];

    for (const filePath of filePaths) {
      newTracks.push(await window.musicMetadataApi.getTrackInfo(filePath));
    }

    setTracks((oldTracks) => [ ...oldTracks, ...newTracks]);
    await window.databaseApi.writeMusicFiles(newTracks);
  }

  return (
    <div className="icon-big">
      <img src={addFolderIcon} onClick={readFolder} alt="add folder icon" />
    </div>
  )
}

export default ReadMusicFolder;