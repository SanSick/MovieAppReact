// import React from "react";
// import { Link } from "react-router-dom";

// const Header = ({ data }) => {
//   //   console.log(data);
//   return (
//     <div
//       style={{
//         background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
//           data.backdrop_path || data.profile_path
//         })`,
//         backgroundPosition: "center 0%",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//       className="w-full md:h-[70vh] flex flex-col justify-start md:justify-end items-start p-[5%] text-white"
//     >
//       <h1 className="w-[70%] text-5xl font-black text-white ">
//         {data.name || data.title || data.original_name || data.original_title}
//       </h1>
//       <p className="w-[60%] my-3">
//         {data.overview.slice(0, 200)} . . .
//         <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
//       </p>

//       <p className="">
//         <i className="mr-1 text-yellow-500 ri-megaphone-fill"></i>
//         {data.release_date || "No Information"}
//         <i className="ml-7 mr-1 text-yellow-500 ri-film-fill"></i>
//         {data.media_type.toUpperCase()}
//       </p>

//       <Link to={`${data.media_type}/details/${data.id}/trailer`} className="mt-5 bg-[#6556CD] px-4 py-3 rounded-md ">
//         Watch Trailer
//       </Link>
//     </div>
//   );
// };

// export default Header;






//!----------- Responsive code ---------------// 

import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
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
      className="w-full h-[50vh] sm:h-[65vh] md:h-[70vh] flex flex-col justify-end items-start p-4 sm:p-6 md:p-[5%] text-white"
    >
      {/* Title */}
      <h1 className="w-full sm:w-[80%] md:w-[70%] text-2xl sm:text-3xl md:text-5xl font-black">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>

      {/* Overview */}
      <p className="w-full sm:w-[80%] md:w-[60%] my-2 sm:my-3 text-sm sm:text-base">
        {data.overview.slice(0, 200)} . . .
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>

      {/* Release info */}
      <p className="text-xs sm:text-sm md:text-base">
        <i className="mr-1 text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || "No Information"}
        <i className="ml-4 mr-1 text-yellow-500 ri-film-fill"></i>
        {data.media_type?.toUpperCase()}
      </p>

      {/* Trailer button */}
      <Link
        to={`${data.media_type}/details/${data.id}/trailer`}
        className="mt-4 sm:mt-5 bg-[#6556CD] px-3 py-2 sm:px-4 sm:py-3 rounded-md text-sm sm:text-base"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
