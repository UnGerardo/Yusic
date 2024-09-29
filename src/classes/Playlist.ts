
export default class Playlist {
  id: number | undefined;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}