import React, { useEffect, useState } from "react";
import Card from "./Card";
import { IEAnime } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingIcon from "./Loading";

const RightPanel = () => {
  const { isLoading, error, data } = useQuery<IEAnime[]>({
    queryFn: () =>
      axios
        .get("https://gogoanime.consumet.stream/popular")
        .then((d) => d.data),
    queryKey: ["POPULAR"],
  });

  if (isLoading) return <LoadingIcon />;
  console.log(data);

  return (
    <div className="flex flex-row flex-wrap">
      {data?.map((anime) => {
        return <Card animeInfo={anime} key={anime.animeId} />;
      })}
    </div>
  );
};

export default RightPanel;
