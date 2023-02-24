// import React from "react";
// import { IEAnime } from "../types";
// import { useNavigate } from "react-router-dom";
// const Card = ({ animeInfo }: { animeInfo: IEAnime }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="w-64 h-120 rounded-md m-2 text-cyan-50"
//       style={{ backgroundColor: "#2a2c31" }}
//       onClick={() => {
//         console.log("CLICKED ON CARD");
//         navigate(`/episode/${animeInfo.animeId}`);
//       }}
//     >
//       <img
//         className="w-full h-80"
//         // style={{ backgroundImage:  }}
//         src={animeInfo.animeImg}
//       ></img>
//       <div className="flex justify-center ">{animeInfo.animeTitle}</div>
//     </div>
//   );
// };

import React from "react";
import { IEAnime } from "../types";
import { useNavigate, useParams } from "react-router-dom";

const WatchEpisode = ({ animeInfo }: { animeInfo: IEAnime }) => {
  const param = useParams();
  return <div className="text-gray-200">{param.id}</div>;
};

export default WatchEpisode;
