import ReactTrack from "@renderer/react-classes/ReactTrack"

const updateTrackIndicies = (tracks: ReactTrack[]) => {
  tracks.forEach((track, i) => {
    track.index = i;
  });
}

export default updateTrackIndicies;