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
  const videoContainer = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useQuery<IWatchEpisode>({
    queryFn: () =>
      episodeId
        ? api.get(`/watch/${episodeId}`).then((d) => d.data)
        : new Promise((resolve) => resolve(true)).then(() => []),
    queryKey: ["WATCH_EPISODE", episodeId],
  });
  const remote = useContext(ControlsContext);

  //   useEffect(() => {
  //     remote.registerEvent((e) => {
  //       if (e === "play-pause") ref.current?.play();
  //     }, "WATCH_PAGE");
  //   }, []);
  useEffect(() => {
    remote.registerEvent((e) => {
      ref.current?.pause();
    }, "BACK_VIDEO_PAUSE");
    remote.registerEvent((e) => {
      if (ref.current) {
        if (e === "forward")
          ref.current.currentTime = ref.current.currentTime + 10;
        if (e === "backward")
          ref.current.currentTime = ref.current.currentTime - 10;
      }
    }, "FORWARD_BACKWARD");
  }, []);
  useEffect(() => {
    const hls = new Hls();
    if (data && ref.current) {
      const sourcesSorted: { [key: string]: string } = {};
      data?.sources.forEach((el) => {
        sourcesSorted[el.quality] = el.url;
      });
      let loadSource = "";
      if (sourcesSorted["360p"]) {
        loadSource = sourcesSorted["360p"];
      }
      if (sourcesSorted["480p"]) {
        loadSource = sourcesSorted["480p"];
      }
      if (sourcesSorted["720p"]) {
        loadSource = sourcesSorted["720p"];
      }
      if (sourcesSorted["1080p"]) {
        loadSource = sourcesSorted["1080p"];
      }
      console.log(loadSource);
      hls.loadSource(loadSource);
      hls.attachMedia(ref.current);
      ref.current.play();

      ref.current.requestFullscreen();
      // addEventListener("fullscreenchange", (event) => {
      //   console.log(event.);
      // });
    }
  }, [data?.sources]);

  if (isLoading) return <LoadingIcon />;

  return (
    <div
      className="align-middle flex justify-center flex-col text-white"
      ref={videoContainer}
    >
      <video ref={ref} controls={false} />
    </div>
  );
};

export default WatchEpisode;
