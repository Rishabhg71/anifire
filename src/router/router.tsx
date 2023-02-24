import Screen from "../screen/Main";
import EpisodeList from "../screen/EpisodeList";
import HeadNavbar from "../components/HeadNavbar";
import WatchEpisode from "../screen/Watch";
import { Navigate } from "react-router-dom";

const NavBarWrapper = (El: any) => {
  return (
    <>
      <HeadNavbar />
      <El />
    </>
  );
};

export const router = [
  { route: "/", Element: <Navigate to="/home" /> },
  {
    route: "/home",
    Element: NavBarWrapper(Screen),
  },
  { route: "/episode/:id", Element: NavBarWrapper(EpisodeList) },
  { route: "/episode/watch/:id", Element: NavBarWrapper(WatchEpisode) },
];
