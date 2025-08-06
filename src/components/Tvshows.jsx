import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";

const Tvshows = () => {
  document.title = "SCSDB | Tv Shows";

  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hashMore, sethashMore] = useState(true);

  const Gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        // settv(data.results);
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
        // console.log(data.results);
      } else {
        sethashMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // console.log(tv);

  const refreshHandler = () => {
    if (tv.length === 0) {
      Gettv();
    } else {
      setpage(1);
      settv([]);
      Gettv();
    }
  };

  useEffect(() => {
    // Gettv();
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[2%] mt-[1%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          Tv <span className="text-sm text-zinc-600">({category})</span>
        </h1>

        <div className="flex items-center w-[85%]">
          <Topnav />

          <div className="w-[2%]"> </div>
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "air_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[1%]"> </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={Gettv()}
        hasMore={hashMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
