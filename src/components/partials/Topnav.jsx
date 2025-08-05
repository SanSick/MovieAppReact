import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noImage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  // console.log(query);
  const [searches, setsearches] = useState([]); //we are not using null because map works on array and if we use null it will through error

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data.results);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    
    <div className="w-[60%] mx-auto h-[12vh] relative flex items-center">
      <i className="text-zinc-400 text-xl ri-search-line"></i>
      <input
        onChange={(e) => {
          setquery(e.target.value);
        }}
        value={query}
        className="w-[100%] text-zinc-400 ml-1 mr-7 py-3 px-2 text-xl outline-none border-none rounded-lg "
        type="text"
        placeholder="search anything"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 text-2xl cursor-pointer ri-close-fill right-0"
        ></i>
      )}

      <div className="rounded-sm absolute w-[100%] max-h-[50vh] top-[100%] bg-zinc-200 overflow-auto">
        {searches.map((s, i) => (
          <Link
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-8 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path
              }`: noimage
            }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;






//!-------------------Old Code---------------------!//
// import axios from "../../utils/axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import noimage from "/noImage.jpg";

// const Topnav = () => {
//   const [query, setquery] = useState("");
//   // console.log(query);
//   const [searches, setsearches] = useState([]); //we are not using null because map works on array and if we use null it will through error

//   const GetSearches = async () => {
//     try {
//       const { data } = await axios.get(`/search/multi?query=${query}`);
//       // console.log(data.results);
//       setsearches(data.results);
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   };

//   useEffect(() => {
//     GetSearches();
//   }, [query]);

//   return (

//     <div className="w-[90%] h-[12vh] relative flex pl-[20%] items-center">
//       <i className="text-zinc-400 text-2xl ri-search-line"></i>
//       <input
//         onChange={(e) => {
//           setquery(e.target.value);
//         }}
//         value={query}
//         className="w-[65%] text-white ml-4 mr-10 py-3 px-5 text-xl outline-none border-none rounded-lg "
//         type="text"
//         placeholder="search anything"
//       />

//       {query.length > 0 && (
//         <i
//           onClick={() => setquery("")}
//           className="text-zinc-400 text-2xl cursor-pointer ri-close-fill right-0"
//         ></i>
//       )}

//       <div className="rounded-sm absolute w-[62%] max-h-[50vh] top-[100%] bg-zinc-200 overflow-auto">
//         {searches.map((s, i) => (
//           <Link
//             key={i}
//             className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-8 flex justify-start items-center border-b-2 border-zinc-100"
//           >
//             <img
//               className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
//               src={
//                 s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${
//                 s.backdrop_path || s.profile_path
//               }`: noimage
//             }
//               alt=""
//             />
//             <span>
//               {s.name || s.title || s.original_name || s.original_title}
//             </span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Topnav;
