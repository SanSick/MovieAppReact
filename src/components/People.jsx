import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";

const People = () => {
  document.title = "SCSDB | Tv Shows";

  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hashMore, sethashMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        // setperson(data.results);
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
        // console.log(data.results);
      } else {
        sethashMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // console.log(person);

  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setpage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    // GetPerson();
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[2%] mt-[1%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          People 
        </h1>

        <div className="flex items-center w-[85%]">
          <Topnav />
          <div className="w-[2%]"> </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson()}
        hasMore={hashMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
