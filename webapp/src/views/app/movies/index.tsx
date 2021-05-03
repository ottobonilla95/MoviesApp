import React, { FunctionComponent, useEffect, useState } from "react";

// material ui
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";

// components
import MovieItem from "./MovieItem";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import MovieForm from "./MovieForm";

// redux
import { connect, ConnectedProps } from "react-redux";

// actions
import {
  getMovies,
  createMovie,
  deleteMovie,
} from "../../../redux/movies/actions";

// types
import { RootState } from "../../../redux/rootReducer";

interface Props extends PropsFromRedux {}

const MoviesView: FunctionComponent<Props> = (props) => {
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    props.getMovies();
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Movies</h1>
        <IconButton
          onClick={() => setShowMovieForm(true)}
          disabled={props.movies.loading}
        >
          <AddCircleIcon />
        </IconButton>
      </div>
      {props.movies.loading && (
        <LinearProgress style={{ marginBottom: "10px" }} />
      )}
      <Divider style={{ marginBottom: "10px" }} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {props.movies.movies.map((movie) => (
          <MovieItem
            key={movie.id}
            {...movie}
            loading={props.movies.loading}
            onDeleteClick={() => {
              setShowConfirmDialog(true);
              setMovieToDelete(movie.id);
            }}
            isOwn={props.user.user?.id === movie.userId}
          />
        ))}
        {props.movies.movies.length === 0 && (
          <Typography
            style={{
              backgroundColor: "lightgray",
              padding: "20px",
              width: "100%",
              borderRadius: 5,
              textAlign: "center",
            }}
          >
            No movies found
          </Typography>
        )}
      </div>

      <MovieForm
        isOpen={showMovieForm}
        handleClose={() => setShowMovieForm(false)}
        loading={props.movies.loading}
        onSubmit={(form) => {
          props.createMovie(form.name, form.description, form.image);
          setShowMovieForm(false);
        }}
      />
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Delete"
        message="Are you sure you want to delete this item?"
        handleAction={() => {
          props.deleteMovie(movieToDelete!);
          setShowConfirmDialog(false);
        }}
        handleClose={() => setShowConfirmDialog(false)}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return state;
};

const connector = connect(mapStateToProps, {
  getMovies,
  createMovie,
  deleteMovie,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MoviesView);
