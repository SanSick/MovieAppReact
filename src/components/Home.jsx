import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "SCSDB | Homepage";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // console.log(data.results);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
        // console.log(randomdata);
        setwallpaper(randomdata);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
  // console.log(wallpaper);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      // console.log(data.results);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);
  // console.log(trending);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[81%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className="flex justify-between p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
