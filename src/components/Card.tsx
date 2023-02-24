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
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const AnimeCard = ({ animeInfo }: { animeInfo: IEAnime }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ maxWidth: 345 }}
      className="w-72 m-2"
      onClick={() => {
        navigate(`/episode/${animeInfo.animeId}`);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={animeInfo.animeImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {animeInfo.animeTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard;
