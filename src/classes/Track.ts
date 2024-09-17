import { IAudioMetadata } from "music-metadata";

export default class Track {
  id: number | undefined;
  path: string;
  title: string;
  artists: string;
  album: string;
  duration: number;
  imgFormat: string;
  imgData: string;

  constructor(metadata: IAudioMetadata = {} as IAudioMetadata, path: string = '', pictureData: string = '') {
    this.path = path;
    this.title = metadata.common.title ?? 'None';
    this.artists = metadata.common.artist ?? 'None';
    this.album = metadata.common.album ?? 'None';
    this.duration = metadata.format.duration ?? 0;
    this.imgFormat = metadata.common.picture?.at(0)?.format ?? 'None';
    this.imgData = pictureData;
  }
}