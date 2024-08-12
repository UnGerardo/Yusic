import { IAudioMetadata } from "music-metadata";

export default interface TrackTagsApi {
  getTrackTags: (file: string) => Promise<IAudioMetadata>;
  uint8ToBase64: (data: Uint8Array) => Promise<string>;
}
