import { IAudioMetadata } from "music-metadata";
import Track from "../classes/Track";

export default interface MusicMetadataApi {
  getTrackInfo: (filePath: string) => Promise<Track>;
}
