import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const MovieForm = ({ onAddMovie, onUpdateMovie, defaultValues, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    console.log("MovieForm mountovan");
    if (!defaultValues) {
      reset({
        name: "",
        hall: "",
        price: "",
        poster: "",
        likes: Math.floor(Math.random() * 5) + 1,
        dislikes: Math.floor(Math.random() * 5) + 1,
      });
    } else {
      reset(defaultValues);
    }

    return () => {
      console.log("MovieForm unmountovan");
    };
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    const newMovie = {
      id: defaultValues?.id,
      name: data.name,
      hall: Number(data.hall),
      price: Number(data.price),
      poster: data.poster,
      likes: data.likes || 0,
      dislikes: data.dislikes || 0,
    };

    if (defaultValues) {
      onUpdateMovie(newMovie);
    } else {
      onAddMovie(newMovie);
    }
    reset();
  };

  return (
    <div className="movieForm-overlay">
      <div className="movieForm-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title">Dodaj/Izmeni Film</h2>

          <label>
            Naziv:{" "}
            <input
              type="text"
              {...register("name", { required: "Naziv filma morate uneti" })}
            />
          </label>
          {errors.name && <span className="error">{errors.name.message}</span>}

          <label>
            Sala:{" "}
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
            Slika: <input type="text" {...register("poster")} />
          </label>

          <label>
            Cena:{" "}
            <input
              type="number"
              {...register("price", { required: "Cenu za film morate uneti" })}
            />
          </label>
          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}

          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
