import Track from "../classes/Track";
import Setting from "../classes/Setting";
import Playlist from "../classes/Playlist";

export default interface DatabaseApi {
  writeMusicFiles: (tracks: Track[]) => Promise<void>;
  getAllMusicFiles: () => Promise<Track[]>;
  getTrackIds: () => Promise<number[]>;
  getTrackById: (id: number) => Promise<Track>;
  getAppSettings: () => Promise<Setting[]>;
  setAppSetting: (name: string, value: string) => Promise<void>;
  getPlaylists: () => Promise<Playlist[]>;
  createPlaylist: (name: string) => Promise<void>;
  getPlaylistTracks: (playlistId: number) => Promise<Track[]>;
  addTrackToPlaylist: (playlistId: number, trackId: number) => Promise<void>;
}