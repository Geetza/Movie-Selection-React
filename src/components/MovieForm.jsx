import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createMovie,
  getOneMovie,
  updateMovie,
} from "../services/movieService";
import Spinner from "./Spinner";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      hall: "",
      price: "",
      poster: "",
      likes: Math.floor(Math.random() * 5) + 1,
      dislikes: Math.floor(Math.random() * 5) + 1,
    },
  });

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          setLoading(true);
          const movie = await getOneMovie(id);
          reset({
            name: movie.name,
            hall: movie.hall,
            price: movie.price,
            poster: movie.poster,
            likes: movie.likes,
            dislikes: movie.dislikes,
          });
        } catch (error) {
          console.error("Greska pri ucitavanju filma", error);
          setError("Greska pri ucitavanju filma");
        } finally {
          setLoading(false);
        }
      } else {
        reset({
          name: "",
          hall: "",
          price: "",
          poster: "",
          likes: 0,
          dislikes: 0,
        });
      }
    };

    fetchMovie();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        await updateMovie({ ...data, id: Number(id) });
      } else {
        await createMovie(data);
      }
      navigate("/movies");
    } catch (err) {
      console.error("Greska pri snimanju filma", err);
      setError("Greska pri snimanju filma");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="movieForm-overlay">
      <div className="movieForm-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h2 className="form-title">{id ? "Izmeni film" : "Dodaj film"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Naziv:
            <input
              type="text"
              {...register("name", { required: "Naziv filma je obavezan" })}
            />
          </label>
          {errors.name && <span className="error">{errors.name.message}</span>}

          <label>
            Sala:
            <input
              type="number"
              {...register("hall", {
                required: "Salu za film morate uneti",
                min: { value: 1, message: "Najmanji broj za salu je 1" },
                max: { value: 12, message: "Najveci broj za salu je 12" },
              })}
            />
          </label>
          {errors.hall && <span className="error">{errors.hall.message}</span>}

          <label>
            Cena:
            <input
              type="number"
              {...register("price", {
                required: "Cenu za film morate uneti",
                min: { value: 1, message: "Cena ne moze biti manja od 1" },
              })}
            />
          </label>
          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}

          <label>
            Poster:
            <input type="text" {...register("poster")} />
          </label>

          <div className="submit-btn-container">
            <button type="submit">{id ? "Sacuvaj" : "Dodaj"}</button>
            <button type="button" onClick={() => navigate("/movies")}>
              Otkazi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
