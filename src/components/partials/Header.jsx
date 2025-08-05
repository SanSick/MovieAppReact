import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  //   console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center 0%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[70vh] flex flex-col justify-end items-start p-[5%] text-white"
    >
      <h1 className="w-[70%] text-5xl font-black text-white ">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[60%] my-3">
        {data.overview.slice(0, 200)}...
        <Link className="text-blue-400">more</Link>
      </p>

      <p className="">
        <i className="mr-1 text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || "No Information"}
        <i className="ml-7 mr-1 text-yellow-500 ri-film-fill"></i>
        {data.media_type.toUpperCase()}
      </p>

      <Link className="mt-5 bg-[#6556CD] px-4 py-3 rounded-md ">
        {" "}
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
