import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/movies/new">Add Movie</Link>
      </div>
    </header>
  );
};

export default Header;
