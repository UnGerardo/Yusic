import { IAudioMetadata } from "music-metadata";

export default class Track {
  id: number | undefined;
  path: string;
  title: string | undefined;
  artists: string | undefined;
  album: string | undefined;
  duration: number | undefined;
  imgFormat: string | undefined;
  imgData: string;

  constructor(metadata: IAudioMetadata = {} as IAudioMetadata, path: string = '', pictureData: string = '') {
    this.path = path;
    this.title = metadata.common.title;
    this.artists = metadata.common.artist;
    this.album = metadata.common.album;
    this.duration = metadata.format.duration;
    this.imgFormat = metadata.common.picture?.at(0)?.format;
    this.imgData = pictureData;
  }
}