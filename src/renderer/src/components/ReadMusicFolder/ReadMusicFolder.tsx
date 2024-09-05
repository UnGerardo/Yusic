import { useContext } from "react";
import { IAudioMetadata } from "music-metadata";

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
      const metadata: IAudioMetadata = await window.trackTagsApi.getTrackTags(filePath);
      let pictureData = metadata.common.picture?.at(0)?.data || new Uint8Array();
      const track = new Track(metadata, filePath, await window.trackTagsApi.uint8ToBase64(pictureData));
      newTracks.push(track);
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