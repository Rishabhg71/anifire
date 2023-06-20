import React, { useContext, useEffect, useRef, useState } from "react";
import { IEAnime, IWatchEpisode } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingIcon from "../components/Loading";
import api from "../services/axios";
import { ControlsContext } from "../context/RemoteControl";
import { Button, MenuItem, Select } from "@mui/material";
import Hls from "hls.js";

const WatchEpisode = ({ episodeId }: { episodeId: string }) => {
  //   const param = useParams();
  const ref = useRef<HTMLVideoElement>(null);
  const { data, isLoading } = useQuery<IWatchEpisode>({
    queryFn: () => api.get(`/watch/${episodeId}`).then((d) => d.data),
    queryKey: ["WATCH_EPISODE", episodeId],
  });
  const remote = useContext(ControlsContext);

  //   useEffect(() => {
  //     remote.registerEvent((e) => {
  //       if (e === "play-pause") ref.current?.play();
  //     }, "WATCH_PAGE");
  //   }, []);

  useEffect(() => {
    const hls = new Hls();
    if (data && ref.current) {
      hls.loadSource(data?.sources[0].url);
      hls.attachMedia(ref.current);
      ref.current.play();
      ref.current.requestFullscreen();
    }
  }, [data?.sources]);

  if (isLoading) return <LoadingIcon />;

  return (
    <div className="align-middle flex justify-center flex-col text-white">
      <video ref={ref} controls={false} />
    </div>
  );
};

export default WatchEpisode;
