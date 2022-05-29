import React, {useState, useEffect} from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchURL, isLargeRow }) {
        const [movies, setMovies] = useState([]);
        const [trailerUrl, setTrailerUrl] = useState("");

        //A snippet of code which runs based on one condition
        useEffect(() => {
          //making request
          async function fetchData(){
            const request = await axios.get(fetchURL);
            //console.log(request.data.results);
            setMovies(request.data.results);
            return request;
          }
          fetchData();
        }, [fetchURL]);
        
      // console.log(movies);
        
          const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };

          
            const handleClick = (movie) => {
              if (trailerUrl) {
                setTrailerUrl('')
              } else {
                movieTrailer(movie?.name || "")
                  .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                  }).catch((error) => console.log(error));
              }
            };


  return (
    <div className="row">
        {/* title */}
        <h2>{title}</h2>

        <div className="row_posters">
        {/* several poster(s) */}
        
          {movies.map(movie => (
            <img 
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                  alt={movie.name}
            />
          ))}
        </div>
      
        {trailerUrl && <YouTube videoID={trailerUrl} opts={opts} />}

            
    </div>
  )
}

export default Row;


