import { IAudioMetadata } from "music-metadata";

export default class Track {
  name: string | undefined;
  artists: string | undefined;
  album: string | undefined;
  duration: number | undefined;
  imgFormat: string | undefined;
  imgData: string;

  constructor(metadata: IAudioMetadata, pictureData: string) {
    this.name = metadata.common.title;
    this.artists = metadata.common.artist;
    this.album = metadata.common.album;
    this.duration = metadata.format.duration ;
    this.imgFormat = metadata.common.picture?.at(0)?.format;
    this.imgData = pictureData;
  }
}