// import { WindowList } from "@renderer/assets/Misc.styled";
// import { TracksContext } from "@renderer/contexts/TracksContext";
// import React, { useContext } from "react";
// import AutoSizer from "react-virtualized-auto-sizer";
// import Artist from "./Artist";

// const ArtistList = React.memo(() => {
//   const { tracks } = useContext(TracksContext);

//   const artistTracksCount = {};
//   for (const track of tracks) {
//     const artists = track.artists.split(', ');

//     for (const artist of artists) {
//       if (!(artist in artistTracksCount)) {
//         artistTracksCount[artist] = 0;
//       }
//       artistTracksCount[artist]++;
//     }
//   }
//   const artists = Object.keys(artistTracksCount);

//   console.log(artists)
//   console.log(artistTracksCount)

//   return (
//     <>
//       <div>Artists Tracks</div>
//       <div>
//         <AutoSizer>
//           {({ height, width }) => (
//             <WindowList
//               height={height}
//               width={width}
//               itemCount={artists.length}
//               itemSize={20}
//               style={{ overflowX: 'hidden' }}
//             >
//               {({ index, style }) => (
//                 <Artist
//                   key={artists[index]}
//                   name={artists[index]}
//                   tracksCount={artistTracksCount[artists[index]]}
//                   style={style}
//                 />
//               )}
//             </WindowList>
//           )}
//         </AutoSizer>
//       </div>
//     </>
//   );
// });

// export default ArtistList;