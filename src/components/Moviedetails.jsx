import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const Moviedetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  console.log(info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen h-screen px-[10%]"
    >
      {/* Part-1 Navigation */}
      <nav className="h-[10vh] w-full text-zinc-300 flex items-center gap-10 text-xl font-medium">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line text-2xl sm:text-xl"
        />
        <a
          target="_blank"
          href={info.detail.homepage}
          className="hover:text-[#6556CD]"
        >
          <i className="ri-external-link-fill text-xl sm:text-lg"></i>
        </a>

        <a
          target="_blank"
          href={`https://en.wikipedia.org/wiki/${
            info.detail.title ||
            info.detail.name ||
            info.detail.original_name ||
            info.detail.original_title
          }`}
          className="hover:text-[#6556CD]"
        >
          <i className="ri-earth-fill text-xl sm:text-lg"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#6556CD] text-sm sm:text-base"
        >
          imdb
        </a>
      </nav>

      {/* Part-2 Poster and details */}
      <div className="w-full flex gap-6 mb-8">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] sm:h-[45vh] lg:h-[50vh] object-cover lg:rounded-none rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Movie Poster"
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl text-white font-black leading-tight">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-200">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
        </div>
      </div>

      {/* Part3 - Available on Platforms */}
      <div className="w-full flex flex-col gap-y-5 mt-8 lg:mt-10">
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 items-center sm:items-start text-white">
            <h1 className="text-base sm:text-lg font-semibold min-w-fit">
              Available on Buy
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {info.watchproviders.buy.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[6vh] h-[6vh] sm:w-[5vh] sm:h-[5vh] object-cover rounded-md hover:scale-110 transition-transform"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 items-center sm:items-start text-white">
            <h1 className="text-base sm:text-lg font-semibold min-w-fit">
              Available on Rent
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {info.watchproviders.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[6vh] h-[6vh] sm:w-[5vh] sm:h-[5vh] object-cover rounded-md hover:scale-110 transition-transform"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 items-center sm:items-start text-white">
            <h1 className="text-base sm:text-lg font-semibold min-w-fit">
              Available on Platforms
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[6vh] h-[6vh] sm:w-[5vh] sm:h-[5vh] object-cover rounded-md hover:scale-110 transition-transform"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
