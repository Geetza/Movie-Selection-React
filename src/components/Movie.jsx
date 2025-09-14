import React from "react";

const Movie = ({ movie, onLike, onDislike, onEdit }) => {
  return (
    <li className="movie-item">
      <div className="movie-container">
        <img className="movie-img" src={movie.slika} alt={movie.naziv} />

        <div className="movie-info">
          <p>{movie.naziv}</p>
          <p>Sala broj: {movie.sala}</p>
          <p>Cena: {movie.cena} RSD</p>

          <div className="movie-btn-container">
            <button onClick={onLike}>Like({movie.ocene.like})</button>
            <button onClick={onDislike}>Dislike({movie.ocene.dislike})</button>
            <button onClick={onEdit}>Edit</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Movie;
