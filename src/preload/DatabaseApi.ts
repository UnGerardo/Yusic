import Track from "../classes/Track";

export default interface DatabaseApi {
  writeMusicFiles: (tracks: Track[]) => Promise<void>;
  getAllMusicFiles: () => Promise<Track[]>;
  getTrackIds: () => Promise<number[]>;
  getTrackById: (id: number) => Promise<Track>;
}