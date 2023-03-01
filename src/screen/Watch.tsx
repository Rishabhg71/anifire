import React from "react";
import { IEAnime, IWatchEpisode } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingIcon from "../components/Loading";
import api from "../services/axios";
import ReactPlayer from "react-player";

const WatchEpisode = () => {
  const param = useParams();
  const { data, isLoading } = useQuery<IWatchEpisode>({
    queryFn: () => api.get(`/watch/${param.id}`).then((d) => d.data),
    queryKey: ["WATCH_EPISODE", param.id],
  });

  return (
    <div className="align-middle flex justify-center">
      <ReactPlayer
        // style={{ width: "90%", height: "120" }}
        height="50em"
        width="90%"
        url={data?.sources[0].url}
        controls={true}
      />
    </div>
  );
};

export default WatchEpisode;
