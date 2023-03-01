import React, { useEffect, useRef, useState } from "react";
import { IEAnime, IWatchEpisode } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingIcon from "../components/Loading";
import api from "../services/axios";
import ReactPlayer from "react-player";

const WatchEpisode = () => {
  const param = useParams();
  const ref = useRef<ReactPlayer>(null);
  const [play, setPlay] = useState(false);
  const { data, isLoading } = useQuery<IWatchEpisode>({
    queryFn: () => api.get(`/watch/${param.id}`).then((d) => d.data),
    queryKey: ["WATCH_EPISODE", param.id],
  });
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      console.log(e.key);
      const currentTime = ref?.current?.getCurrentTime() ?? 0;
      if (e.key === "ArrowRight") {
        ref.current?.seekTo(currentTime + 10);
      }
      if (e.key === "ArrowLeft") {
        ref.current?.seekTo(currentTime - 10);
      }
    });
  }, []);

  return (
    <div className="align-middle flex justify-center flex-col text-white">
      <ReactPlayer
        // style={{ width: "90%", height: "120" }}
        height="50em"
        width="90%"
        url={data?.sources[0].url}
        controls={true}
        playing={play}
        ref={ref}
      />
      <button onClick={() => setPlay(!play)}>play</button>
      <button onClick={() => setPlay(!play)}>forward</button>
      <button
        onClick={() => {
          // ref.current?.seekTo(60);
        }}
      >
        forward
      </button>
    </div>
  );
};

export default WatchEpisode;
