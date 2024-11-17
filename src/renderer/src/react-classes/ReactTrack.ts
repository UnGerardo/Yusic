
export default class ReactTrack {
  id: number;
  index: number;
  path: string;
  title: string;
  artists: string;
  album: string;
  duration: number;
  imgFormat: string;
  imgData: string;

  constructor(
    id: number = -1,
    index: number = -1,
    path: string = '',
    title: string = '',
    artists: string = '',
    album: string = '',
    duration: number = 0,
    imgFormat: string = '',
    imgData: string = '',
  ) {
    this.id = id;
    this.index = index;
    this.path = path;
    this.title = title;
    this.artists = artists;
    this.album = album;
    this.duration = duration;
    this.imgFormat = imgFormat;
    this.imgData = imgData;
  }

  getUniqueId(): string {
    return `${this.index}-${this.id}`;
  }
}