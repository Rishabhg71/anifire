import React, { useContext, useEffect, useRef, useState } from "react";
import { IEAnime, IWatchEpisode } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingIcon from "../components/Loading";
import api from "../services/axios";
import ReactPlayer from "react-player";
import { ControlsContext } from "../context/RemoteControl";
import { Button, MenuItem, Select } from "@mui/material";
const WatchEpisode = () => {
  const param = useParams();
  const [activeUrl, setActiveUrl] = useState<string | undefined>("");
  const ref = useRef<ReactPlayer>(null);
  const [play, setPlay] = useState(false);
  const { data, isLoading } = useQuery<IWatchEpisode>({
    queryFn: () => api.get(`/watch/${param.id}`).then((d) => d.data),
    queryKey: ["WATCH_EPISODE", param.id],
  });
  const remote = useContext(ControlsContext);

  useEffect(() => {
    remote.registerEvent((e) => {
      const currentTime = ref?.current?.getCurrentTime() ?? 0;
      ref.current?.setState({ controls: true });
      if (e === "forward") ref.current?.seekTo(currentTime + 10);
      if (e === "backward") ref.current?.seekTo(currentTime - 10);
      if (e === "play-pause") setPlay((e) => !e);
    }, "WATCH_PAGE");
  }, []);

  useEffect(() => {
    setActiveUrl(data?.sources[0].url);
  }, [data?.sources]);

  if (isLoading) return <LoadingIcon />;

  return (
    <div className="align-middle flex justify-center flex-col text-white">
      <ReactPlayer
        // style={{ width: "90%", height: "120" }}
        height="50em"
        width="90%"
        url={activeUrl}
        controls={true}
        // light={<></>}
        previewTabIndex={1}
        playing={play}
        ref={ref}
      />
      <Select
        className="text-white bg-slate-200 w-80"
        onChange={(e) => {
          console.log(e.target.value);
          setActiveUrl(e.target.value as string);
        }}
        // onSelect={(e)=> }
      >
        {data?.sources.map((source) => (
          <MenuItem className="text-white" value={source.url}>
            {source.quality}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={(e) => {}}></Button>
    </div>
  );
};

export default WatchEpisode;
