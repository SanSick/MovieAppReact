import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  console.log(data);
  return (
    <div className="w-full h-full mt-8 flex flex-wrap pl-[4%] gap-6 px-[2%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link 
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative w-[14.5%] bg-zinc-900 rounded-lg overflow-hidden shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] transition-all duration-300 hover:scale-105 hover:rounded-none"
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
          />

          <h1 className="px-2 py-4 text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className="absolute right-[5%] top-[2%] text-xs text-white w-[7vh] h-[4vh] font-semibold bg-orange-400 rounded-full flex justify-center items-center text-center">
              {(c.vote_average * 10).toFixed()}{" "}
              <sup className="pt-2 pl-[0.5%] font-bold">%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
