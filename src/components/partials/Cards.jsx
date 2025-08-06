import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data, title}) => {
  return (
    <div className='w-full h-full mt-8 flex flex-wrap pl-[4%] gap-6 px-[2%] bg-[#1F1E24]'>
      {data.map((c, i) => (
        <Link key={i} className='w-[14.5%] bg-zinc-900 rounded-lg overflow-hidden shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] transition-all duration-300 hover:scale-105 hover:rounded-none'>
            <img src={`https://image.tmdb.org/t/p/original/${
              c.poster_path ||  c.backdrop_path 
            }`}
            alt="" />

            <h1 className='px-2 py-4 text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2'>{c.name || c.title || c.original_name || c.original_title}</h1>
        </Link>
      ))}

    </div>
  )
}

export default Cards





