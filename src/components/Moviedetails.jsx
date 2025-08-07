import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const Moviedetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {info} = useSelector(state => state.movie)
  console.log(info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    }
  }, [])

  return info ? (
    <div 
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }} 
     className='w-screen h-screen px-[10%]'>
      <nav className='w-full text-zinc-300'>
        <Link 
          onClick={() => navigate(-1)} 
          className="hover:text-[#6556CD] ri-arrow-left-line text-2xl sm:text-xl"
        />
        <a href="" className="hover:text-[#6556CD]">
          <i className="ri-external-link-fill text-xl sm:text-lg"></i>
        </a>

        <a href="" className="hover:text-[#6556CD]"
        >
          <i className="ri-earth-fill text-xl sm:text-lg"></i>
        </a>
       
        <a href="" className="hover:text-[#6556CD] text-sm sm:text-base"
        >
          imdb
        </a>

      </nav>

    </div>
  ) : (
    <Loading/>
  )
}

export default Moviedetails