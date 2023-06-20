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

const WatchEpisode = () => {
  const param = useParams();
  const [activeUrl, setActiveUrl] = useState<string | undefined>("");
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const { data, isLoading } = useQuery<IWatchEpisode>({
    queryFn: () => api.get(`/watch/${param.id}`).then((d) => d.data),
    queryKey: ["WATCH_EPISODE", param.id],
  });
  const remote = useContext(ControlsContext);

  useEffect(() => {
    remote.registerEvent((e) => {
      if (e === "play-pause") ref.current?.play();
    }, "WATCH_PAGE");
  }, []);

  useEffect(() => {
    console.log("RUNNING");

    const hls = new Hls();
    if (data && ref.current) {
      hls.loadSource(data?.sources[0].url);
      hls.attachMedia(ref.current);
    }
    setActiveUrl(data?.sources[0].url);
  }, [data?.sources]);

  if (isLoading) return <LoadingIcon />;

  return (
    <div className="align-middle flex justify-center flex-col text-white">
      <video ref={ref} controls={false} />

      <Select
        className="text-white bg-slate-200 w-80"
        onChange={(e) => {
          console.log(e.target.value);
          setActiveUrl(e.target.value as string);
        }}
      >
        {data?.sources.map((source) => (
          <MenuItem className="text-white" value={source.url}>
            {source.quality}
          </MenuItem>
        ))}
      </Select>
      <Button
        className="text-white bg-slate-200 w-80"
        onClick={() => ref.current?.requestFullscreen()}
      >
        FullScreen
      </Button>
    </div>
  );
};

export default WatchEpisode;
