
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

  constructor({
    id = -1,
    index = -1,
    path = '',
    title = '',
    artists = '',
    album = '',
    duration = 0,
    imgFormat = '',
    imgData = '',
  }: {
    id: number,
    index: number,
    path: string,
    title: string,
    artists: string,
    album: string,
    duration: number,
    imgFormat: string,
    imgData: string,
  }
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

  newCopy(): ReactTrack {
    return new ReactTrack(this);
  }
}