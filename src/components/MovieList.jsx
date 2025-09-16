import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import MovieForm from "./MovieForm";
import {
  getAllMovies,
  createMovie,
  updateMovie,
} from "../services/movieService.js";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [bestRatedMovie, setBestRatedMovie] = useState(null);
  const [error, setError] = useState("");

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
    }
  };

  const handleVote = (id, voteType) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, [voteType]: movie[voteType] + 1 } : movie
      )
    );
  };

  const handleAddMovie = async (newMovie) => {
    try {
      const savedMovie = await createMovie(newMovie);
      setMovies((prevMovies) => [...prevMovies, savedMovie]);
      setShowMovieForm(false);
    } catch (err) {
      setError("Greska pri dodavanju filma");
    }
  };

  const handleEditMovie = (movie) => {
    if (editingMovie && editingMovie.id === movie.id) {
      setEditingMovie(null);
    } else {
      setEditingMovie(movie);
    }
  };

  const handleUpdateMovie = async (movieToUpdate) => {
    try {
      const savedMovie = await updateMovie(movieToUpdate);
      setMovies((prevMovies) =>
        prevMovies.map((m) => (m.id === savedMovie.id ? savedMovie : m))
      );
      setEditingMovie(null);
    } catch {
      setError("Greska pri izmeni filma");
    }
  };

  useEffect(() => {
    console.log("Postavka filmova");
    loadMovies();
  }, []);

  useEffect(() => {
    const bestMovie = getBestRatedMovie(movies);
    setBestRatedMovie(bestMovie);
  }, [movies]);

  useEffect(() => {
    return () => {
      console.log("Sklanjanje filmova");
    };
  }, []);

  return (
    <div>
      <div className="movieList-header">
        <h1 className="movieList-title">Repertoar za danas ({danasnjiDan})</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          className="add-movie-btn"
          onClick={() => setShowMovieForm(true)}
        >
          Dodaj film
        </button>
      </div>

      {showMovieForm && (
        <MovieForm
          onAddMovie={handleAddMovie}
          onCancel={() => setShowMovieForm(false)}
        />
      )}

      {editingMovie && (
        <MovieForm
          onUpdateMovie={handleUpdateMovie}
          defaultValues={editingMovie}
          onCancel={() => setEditingMovie(null)}
        />
      )}

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
              onEdit={() => handleEditMovie(movie)}
              isEditing={editingMovie && editingMovie.id === movie.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
