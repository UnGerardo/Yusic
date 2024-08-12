import { IAudioMetadata } from "music-metadata";

export default class Track {
  filePath: string;
  name: string | undefined;
  artists: string | undefined;
  album: string | undefined;
  duration: number | undefined;
  imgFormat: string | undefined;
  imgData: string;

  constructor(metadata: IAudioMetadata, filePath: string, pictureData: string) {
    this.filePath = filePath;
    this.name = metadata.common.title;
    this.artists = metadata.common.artist;
    this.album = metadata.common.album;
    this.duration = metadata.format.duration ;
    this.imgFormat = metadata.common.picture?.at(0)?.format;
    this.imgData = pictureData;
  }
}