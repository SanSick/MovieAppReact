import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const Moviedetails = () => {
  const {pathname} = useLocation();
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
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative w-full min-h-screen px-4 sm:px-6 lg:px-[10%]"
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
      <div className="w-full flex mb-8">
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
            <small className="text-2xl font-bold pl-2 text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          {/* Rating and Info */}
          <div className="mt-4 mb-6 flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-5">
            <div className="flex items-center gap-4">
              <span className="text-white text-lg sm:text-xl font-semibold w-[8vh] h-[8vh] flex justify-center text-center rounded-full items-center bg-orange-400">
                {(info.detail.vote_average * 10).toFixed()}<sup className="mt-4 ml-[1.2px]">%</sup>
              </span>
              <h1 className="font-semibold text-xl sm:text-2xl leading-6">User Score</h1>
            </div>
            
            <div className="flex flex-row items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <h1>{info.detail.release_date}</h1>
              <h1 className="text-center sm:text-left">{info.detail.genres.map((g) => g.name).join(", ")}</h1>
              <h1>{info.detail.runtime}min</h1>
            </div>
          </div>

          {info.detail.tagline && (
            <h1 className="text-lg sm:text-xl font-semibold italic mb-4 px-4 lg:px-0">
              {info.detail.tagline}
            </h1>
          )}

          {/* Overview */}
          <div className="mb-6">
            <h1 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Overview</h1>
            <p className="text-sm sm:text-base leading-relaxed px-4 lg:px-0">
              {info.detail.overview}
            </p>
          </div>

          {/* Translations */}
          <div className="mb-6">
            <h1 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Movie Translations</h1>
            <p className="mb-7 text-sm sm:text-base px-4 lg:px-0">
              {info.translations.join(" , ")}
            </p>
          </div>

          {/* Trailer Button */}
          <div className="flex justify-center lg:justify-start">
            <Link 
              className="rounded-lg py-3 px-5 bg-[#6556CD] hover:bg-[#5a4bc4] transition-colors text-sm sm:text-base inline-flex items-center" 
              to={`${pathname}/trailer`}
            >
              <i className="text-lg sm:text-xl mr-1 ri-play-fill"></i>
              Play Trailer
            </Link>
          </div>


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


      {/* Part 4 - Recommendations and Similar Stuff */}
      <hr className="bg-zinc-500 mt-8 lg:mt-10 border-none h-[1px]" />
      <h1 className="text-2xl sm:text-3xl mt-6 lg:mt-8 font-bold text-white text-center lg:text-left px-4 lg:px-0">
        Recommendations & Similar Stuff
      </h1>
      <div className="mt-4 mb-8">
        <HorizontalCards 
          data={info.recommendations.length > 0 ? info.recommendations : info.similar}
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
