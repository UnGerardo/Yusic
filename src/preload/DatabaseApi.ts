import Track from "../classes/Track";
import Setting from "../classes/Setting";

export default interface DatabaseApi {
  writeMusicFiles: (tracks: Track[]) => Promise<void>;
  getAllMusicFiles: () => Promise<Track[]>;
  getTrackIds: () => Promise<number[]>;
  getTrackById: (id: number) => Promise<Track>;
  getAppSettings: () => Promise<Setting[]>;
  setAppSetting: (name: string, value: string) => Promise<void>;
}