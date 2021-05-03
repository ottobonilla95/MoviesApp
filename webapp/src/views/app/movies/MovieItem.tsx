import React, { FunctionComponent } from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// interfaces
import { Movie } from "../../../redux/movies/types";

const useStyles = makeStyles({
  root: {
    width: 220,
  },
  media: {
    height: 140,
  },
});

// interfaces
interface Props extends Movie {
  onDeleteClick: () => void;
  loading: boolean;
  isOwn: boolean;
}

const CardMovie: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      data-testid="movie-container"
      style={{ margin: "10px" }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative name"
          data-testid="movie-image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            data-testid="movie-name"
          >
            {props.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            data-testid="movie-description"
          >
            {props.description}
          </Typography>
        </CardContent>
        {props.isOwn && (
          <CardActions disableSpacing>
            <IconButton
              onClick={() => props.onDeleteClick()}
              disabled={props.loading}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </CardActionArea>
    </Card>
  );
};

export default CardMovie;
