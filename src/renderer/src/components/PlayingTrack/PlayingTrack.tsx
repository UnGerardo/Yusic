import { useContext } from "react";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

export default function PlayingTrack(): JSX.Element {
  const { playingTrack } = useContext(PlayingTrackContext);

  return playingTrack ?
    <section id="current-song">
      <img className="track-img" src={playingTrack.imgData ? `data:${playingTrack.imgFormat};base64,${playingTrack.imgData}` : ''} />
      <section className="track-title-artist ellip-overflow">
        <p className="current-song-track ellip-overflow">{playingTrack.title}</p>
        <p className="current-song-artist ellip-overflow">{playingTrack.artists}</p>
      </section>
    </section> : <div></div>
}