import { createContext, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const apiKey = "6aa686f0c4b6edd137850466238559bd";
  const [favMovies, setFavMovies] = useState([]);
  
  //Function for get all movies from api//
  const getMoviesFromApi = (pageNumber) => {
    try {
      return axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=true&include_video=true&language=es-ES&page=${pageNumber}&sort_by=popularity.desc`
        )
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log("No se pudo obtener datos de la api", error);
    }
  };

  //Function for get a movie by Id//
  const getMovieById = (movieId) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: { language: "es-ES" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWE2ODZmMGM0YjZlZGQxMzc4NTA0NjYyMzg1NTliZCIsInN1YiI6IjY1YWQ2NzMwMTU4Yzg1MDBhYzFiZTQ1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.218-C1waSv2k0uRCBvONGXXgsQucOCaui82EXrYQqI4",
      },
    };

    try {
      return axios.request(options).then(function (response) {
        return response.data;
      });
    } catch (error) {
      console.log("Error al obtener datos de la pelicula", error);
    }
  };

  //Function for get a trailler video by ID//
  const getVideoKeyById = async (id) => {
    try {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/videos`,
        params: { language: "es-ES" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWE2ODZmMGM0YjZlZGQxMzc4NTA0NjYyMzg1NTliZCIsInN1YiI6IjY1YWQ2NzMwMTU4Yzg1MDBhYzFiZTQ1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.218-C1waSv2k0uRCBvONGXXgsQucOCaui82EXrYQqI4",
        },
      };
      const response = await axios.request(options);
      return response.data.results[response.data.results.length - 1].key;
    } catch (error) {
      console.error(error);
    }
  };

  // function will get the movies through a query//
  const getMoviesFromSearch = (queryValue) => {
    //Estructura url de endpoint: 'https://api.themoviedb.org/3/search/movie?api_key=¿?&lenguage=es-ES&page=1&include_adult=false&query=¿?'
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWE2ODZmMGM0YjZlZGQxMzc4NTA0NjYyMzg1NTliZCIsInN1YiI6IjY1YWQ2NzMwMTU4Yzg1MDBhYzFiZTQ1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.218-C1waSv2k0uRCBvONGXXgsQucOCaui82EXrYQqI4",
      },
    };

    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&page=1&include_adult=false&query=${queryValue}`,
        options
      )
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //function to add or remove a move from local storage//
  const addOrRemoveFromFavs = ({ image, title, overview, id }, userId) => {
    const cardInfo = {
      image,
      title,
      overview,
      id,
    };
    const favoritesMovies = JSON.parse(localStorage.getItem(`${userId}`));
    const isRepeatedMovie = favoritesMovies.some(
      (movie) => movie.id === cardInfo.id
    );
    if (!isRepeatedMovie) {
      localStorage.setItem(
        `${userId}`,
        JSON.stringify([...favoritesMovies, cardInfo])
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pelicula agregada a favoritos",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      const updatedMovies = favoritesMovies.filter(
        (movie) => movie.id !== cardInfo.id
      );
      localStorage.setItem(`${userId}`, JSON.stringify(updatedMovies));
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Pelicula eliminada de favoritos",
        showConfirmButton: false,
        timer: 1000,
      });
      setFavMovies(updatedMovies);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        getMoviesFromApi,
        getMovieById,
        getVideoKeyById,
        getMoviesFromSearch,
        addOrRemoveFromFavs,
        favMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
export const useMovies = () => useContext(MoviesContext);
