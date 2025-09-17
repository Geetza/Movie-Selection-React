import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import Spinner from "./Spinner.jsx";
import { deleteMovie, getAllMovies } from "../services/movieService.js";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [bestRatedMovie, setBestRatedMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const danasnjiDan = new Date().toLocaleDateString("sr-RS");

  const getBestRatedMovie = (moviesList) => {
    if (moviesList.length === 0) return null;
    return moviesList.reduce((max, current) => {
      const score = current.likes - current.dislikes;
      const maxScore = max.likes - max.dislikes;
      return score > maxScore ? current : max;
    }, moviesList[0]);
  };

  const loadMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
      setError("");
    } catch (err) {
      setError("Greska pri učitavanju filmova");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      setError("Brisanje nije uspelo");
    }
  };

  const handleVote = (id, voteType) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, [voteType]: movie[voteType] + 1 } : movie
      )
    );
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    const bestMovie = getBestRatedMovie(movies);
    setBestRatedMovie(bestMovie);
  }, [movies]);

  if (loading)
    return (
      <div className="spinner-wrapper">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="movieList-header">
        <h1 className="movieList-title">Repertoar za danas ({danasnjiDan})</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {bestRatedMovie && (
        <div className="best-movie">
          <h2>⭐ Najbolje ocenjen film ⭐</h2>
          <img
            className="movie-img"
            src={bestRatedMovie.poster}
            alt={bestRatedMovie.name}
          />
          <div className="best-movie-info">
            <p>{bestRatedMovie.name}</p>
            <p>Sala broj: {bestRatedMovie.hall}</p>
            <p>Cena: {bestRatedMovie.price} RSD</p>
            <p>
              👍{bestRatedMovie.likes} 👎{bestRatedMovie.dislikes}
            </p>
          </div>
        </div>
      )}

      <div className="movies-wrapper">
        <ul className="movie-list">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              onLike={() => handleVote(movie.id, "likes")}
              onDislike={() => handleVote(movie.id, "dislikes")}
              editLink={`/movies/edit/${movie.id}`}
              onDelete={() => handleDelete(movie.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
