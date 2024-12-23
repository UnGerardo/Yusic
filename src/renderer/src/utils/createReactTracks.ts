import ReactTrack from "@renderer/react-classes/ReactTrack";

const createReactTracks = (tracks: ReactTrack[]): ReactTrack[] => {
  const reactTracks = tracks.map((track, i) => {
    const reactTrack = track.newCopy();
    reactTrack.index = i;
    return reactTrack;
  })
  return reactTracks;
}

export default createReactTracks;