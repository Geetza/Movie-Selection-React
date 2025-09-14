import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/movies">Movies</Link>
      </div>
    </header>
  );
};

export default Header;
