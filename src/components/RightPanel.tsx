import React, { useEffect, useState } from "react";
import Card from "./Card";
import { IEAnime } from "../types";
import { useQuery } from "@tanstack/react-query";
import api from "../services/axios";
import LoadingIcon from "./Loading";

const RightPanel = () => {
  const { isLoading, error, data } = useQuery<IEAnime>({
    queryFn: () => api.get("/recent-episodes").then((d) => d.data),
    queryKey: ["POPULAR"],
  });

  if (isLoading) return <LoadingIcon />;
  console.log(data);

  return (
    <div className="flex flex-row flex-wrap">
      {data?.results.map((anime) => {
        return <Card animeInfo={anime} key={anime.id} />;
      })}
    </div>
  );
};

export default RightPanel;
