import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import { IEAnime } from "../types";
import api from "../services/axios";
import Card from "../components/Card";

export default function SearchResults(params: any) {
  const param = useParams();
  const { isLoading, data } = useQuery<IEAnime>({
    queryFn: () => api.get(`/${param.term}`).then((d) => d.data),
    queryKey: ["SEARCH_RESULT", param.term],
  });
  return (
    <div>
      <div className="text-5xl text-white flex flex-row">
        Search Results for <p className="mx-4 text-orange-500">{param.term}</p>:
      </div>
      <div className="flex flex-row flex-wrap">
        {data?.results.map((anime) => {
          return <Card animeInfo={anime} key={anime.id} />;
        })}
      </div>
    </div>
  );
}
