import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie, onLike, onDislike, editLink, onDelete }) => {
  return (
    <li className="movie-item">
      <div className="movie-container">
        <img className="movie-img" src={movie.poster} alt={movie.name} />

        <div className="movie-info">
          <p>{movie.name}</p>
          <p>Sala broj: {movie.hall}</p>
          <p>Cena: {movie.price} RSD</p>

          <div className="movie-btn-container">
            <button onClick={onLike}>Like ({movie.likes})</button>
            <button onClick={onDislike}>Dislike ({movie.dislikes})</button>
            <Link to={editLink} className="edit-btn">
              Edit
            </Link>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Movie;
