// Libraries
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Add a New Movie</h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>
                Title
                <input
                  name="title"
                  type="text"
                  value={newMovie.title}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Director
                <input
                  name="director"
                  type="text"
                  value={newMovie.director}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Genre
                <input
                  name="genre"
                  type="text"
                  value={newMovie.genre}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Metascore
                <input
                  name="metascore"
                  type="number"
                  value={newMovie.metascore}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Description
                <textarea
                  name="description"
                  type="text"
                  value={newMovie.description}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <input
              type="submit"
              className="btn btn-info"
              value="Add New Movie"
            />
            <Link to="/movies">
              <input type="button" className="btn btn-default" value="Cancel" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
