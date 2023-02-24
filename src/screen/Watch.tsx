import React from "react";
import { IEAnime } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingIcon from "../components/Loading";

import videojs from "video.js";
import "video.js/dist/video-js.css";

const WatchEpisode = () => {
  const param = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios
        .get(`https://gogoanime.consumet.stream/vidcdn/watch/${param.id}`)
        .then((d) => d.data),
    queryKey: ["WATCH_EPISODE"],
  });

  const playerRef = React.useRef(null);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  if (isLoading) return <LoadingIcon />;
  console.log(data);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: data.sources[0].file,
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <div className="text-gray-200">
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
};

export const VideoJS = (props: any) => {
  const videoRef = React.useRef<any>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default WatchEpisode;
