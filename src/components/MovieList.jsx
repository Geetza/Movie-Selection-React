import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import MovieForm from "./MovieForm";

const MovieList = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      naziv: "Captain America - The first avenger",
      sala: 2,
      cena: 350,
      slika:
        "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg",
      ocene: { like: 0, dislike: 0 },
    },
    {
      id: 2,
      naziv: "The papillon",
      sala: 1,
      cena: 300,
      slika:
        "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg",
      ocene: { like: 0, dislike: 0 },
    },
    {
      id: 3,
      naziv: "The lost city of Z",
      sala: 5,
      cena: 350,
      slika:
        "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      ocene: { like: 0, dislike: 0 },
    },
    {
      id: 4,
      naziv: "Snatch",
      sala: 4,
      cena: 350,
      slika:
        "https://m.media-amazon.com/images/M/MV5BYzk5NjJkMTQtN2IyNC00YWM5LTlhZmMtNGI3MWNhMTU1YTc4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      ocene: { like: 0, dislike: 0 },
    },
  ]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [bestRatedMovie, setBestRatedMovie] = useState(null);

  const randomNumber = () => Math.floor(Math.random() * 5) + 1;
  const danasnjiDan = new Date().toLocaleDateString("sr-RS");

  useEffect(() => {
    console.log("Postavka filmova");
  }, []);

  useEffect(() => {
    const bestMovie = movies.reduce((max, current) => {
      const score = current.ocene.like - current.ocene.dislike;
      const maxScore = max.ocene.like - max.ocene.dislike;
      return score > maxScore ? current : max;
    });

    setBestRatedMovie(bestMovie);
  }, [movies]);

  useEffect(() => {
    return () => {
      console.log("Sklanjanje filmova");
    };
  }, []);

  const handleVote = (id, tipOcene) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              ocene: { ...movie.ocene, [tipOcene]: movie.ocene[tipOcene] + 1 },
            }
          : movie
      )
    );
  };

  const handleAddMovie = (newMovie) => {
    setMovies((prevMovies) => [
      ...prevMovies,
      {
        ...newMovie,
        id: Date.now(),
        ocene: { like: randomNumber(), dislike: randomNumber() },
      },
    ]);
    setShowMovieForm(false);
  };

  const handleEditMovie = (movie) => {
    if (editingMovie && editingMovie.id === movie.id) {
      setEditingMovie(null);
    } else {
      setEditingMovie(movie);
    }
  };

  const handleUpdateMovie = (updatedMovie) => {
    setMovies((prev) =>
      prev.map((oldMovie) =>
        oldMovie.id === updatedMovie.id ? updatedMovie : oldMovie
      )
    );
    setEditingMovie(null);
  };

  return (
    <div>
      <div className="movieList-header">
        <h1 className="movieList-title">Repertoar za danas ({danasnjiDan})</h1>

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
            src={bestRatedMovie.slika}
            alt={bestRatedMovie.naziv}
          />
          <div className="best-movie-info">
            <p>{bestRatedMovie.naziv}</p>
            <p>Sala broj: {bestRatedMovie.sala}</p>
            <p>Cena: {bestRatedMovie.cena} RSD</p>
            <p>
              👍{bestRatedMovie.ocene.like} 👎{bestRatedMovie.ocene.dislike}
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
              onLike={() => handleVote(movie.id, "like")}
              onDislike={() => handleVote(movie.id, "dislike")}
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
