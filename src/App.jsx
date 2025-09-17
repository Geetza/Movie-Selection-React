import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/new" element={<MovieForm />} />
          <Route path="/movies/edit/:id" element={<MovieForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
