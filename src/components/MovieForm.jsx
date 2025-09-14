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
    if (!defaultValues) {
      reset({
        naziv: "",
        sala: "",
        cena: "",
        slika: "",
        ocene: {
          like: Math.floor(Math.random() * 5) + 1,
          dislike: Math.floor(Math.random() * 5) + 1,
        },
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
      id: defaultValues?.id || Date.now(),
      naziv: data.naziv,
      sala: Number(data.sala),
      cena: Number(data.cena),
      slika: data.slika,
      ocene: defaultValues?.ocene || { like: 0, dislike: 0 },
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
              {...register("naziv", { required: "Naziv filma morate uneti" })}
            />
          </label>
          {errors.naziv && (
            <span className="error">{errors.naziv.message}</span>
          )}

          <label>
            Sala:{" "}
            <input
              type="number"
              {...register("sala", {
                required: "Salu za film morate uneti",
                min: { value: 1, message: "Najmanji broj za salu je 1" },
                max: { value: 12, message: "Najveci broj za salu je 12" },
              })}
            />
          </label>
          {errors.sala && <span className="error">{errors.sala.message}</span>}

          <label>
            Slika: <input type="text" {...register("slika")} />
          </label>

          <label>
            Cena:{" "}
            <input
              type="number"
              {...register("cena", { required: "Cenu za film morate uneti" })}
            />
          </label>
          {errors.cena && <span className="error">{errors.cena.message}</span>}

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
