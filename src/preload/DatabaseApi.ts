import Track from "../classes/Track";

export default interface DatabaseApi {
  writeMusicFiles: (tracks: Track[]) => Promise<void>;
  getAllMusicFiles: () => Promise<Track[]>;
}