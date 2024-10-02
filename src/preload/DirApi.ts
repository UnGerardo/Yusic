import Track from "../classes/Track";

export default interface DirApi {
  readDir: () => Promise<Track[]>;
  log: (s: string) => Promise<void>;
}
