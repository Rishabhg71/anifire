import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IAnimeDetail, IEAnime, IEpisodesList } from "../types";
import LoadingIcon from "../components/Loading";
import api from "../services/axios";

function EpisodeList({}: { animeInfo: IEAnime }) {
  const params = useParams();
  const { data, isLoading } = useQuery<IAnimeDetail>({
    queryFn: () => api.get(`/info/${params.id}`).then((d) => d.data),
    queryKey: ["GET_EPISODES", params.id],
  });
  if (isLoading) return <LoadingIcon />;
  console.log(data);

  return (
    <div className="text-slate-300 flex flex-row">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={data?.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.description?.substring(0, 450)}......
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <div className="w-full">
        <List className="overflow-y-scroll h-full">
          {data?.episodes.map((el) => (
            <EpisodeListItem episode={el} />
          ))}
        </List>
      </div>
    </div>
  );
}

function EpisodeListItem({ episode }: { episode: IEpisodesList }) {
  const navigate = useNavigate();
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(`/episode/watch/${episode.id}`);
          console.log("CLIKED ON EPISODE");
        }}
      >
        <ListItemText primary={episode.number} />
      </ListItemButton>
    </ListItem>
  );
}
export default EpisodeList;
