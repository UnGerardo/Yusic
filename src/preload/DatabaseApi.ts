import Track from "../classes/Track";
import Setting from "../classes/Setting";

export default interface DatabaseApi {
  addTracks: (initialPath: string) => Promise<Track[]>;
  getAllMusicFiles: () => Promise<any[]>;
  getTrackIds: () => Promise<number[]>;
  getTrackById: (id: number) => Promise<Track>;
  getAppSettings: () => Promise<Setting[]>;
  getAppSetting: (name: string) => Promise<Setting>;
  setAppSetting: (name: string, value: string) => Promise<void>;
  createPlaylist: (name: string) => Promise<void>;
  getPlaylistTracks: (playlistId: number) => Promise<Track[]>;
  getPlaylists: () => Promise<object>;
  getPlaylist: (name: string) => Promise<object>;
  getFirstFourPlaylistTracks: (playlistId: number) => Promise<Track[]>;
  addTrackToPlaylist: (playlistId: number, trackId: number) => Promise<void>;
}