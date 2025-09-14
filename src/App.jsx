import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/main.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<MovieList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
