export default interface TrackTagsApi {
  getTrackTags: (file: string) => Promise<void>;
}
