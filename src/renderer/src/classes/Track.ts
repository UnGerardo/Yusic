
export default class Track {
  name: string;
  artists: string;
  album: string;
  duration: number;
  picture: string;

  constructor() {
    this.name = '';
    this.artists = '';
    this.album = '';
    this.duration = 0;
    this.picture = '';
  }
}