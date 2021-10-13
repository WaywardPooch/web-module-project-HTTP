// Libraries
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddMovieForm = (props) => {
  // Destructuring
  const { setMovies } = props;
  const { push } = useHistory();

  // State
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
  });

  // Event Handlers
  const handleChange = (event) => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((response) => {
        setMovies(response.data);
        console.log("ADDED MOVIE SUCCESSFULLY!");
        push("/movies");
      })
      .catch((error) => {
        console.error("COULD NOT POST NEW MOVIE TO API!", error);
      });
  };

  // Markup
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          type="text"
          value={newMovie.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Director
        <input
          name="director"
          type="text"
          value={newMovie.director}
          onChange={handleChange}
        />
      </label>
      <label>
        Genre
        <input
          name="genre"
          type="text"
          value={newMovie.genre}
          onChange={handleChange}
        />
      </label>
      <label>
        Metascore
        <input
          name="metascore"
          type="number"
          value={newMovie.metascore}
          onChange={handleChange}
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          type="text"
          value={newMovie.description}
          onChange={handleChange}
        />
      </label>
      <button>Add New Movie</button>
    </form>
  );
};

export default AddMovieForm;
