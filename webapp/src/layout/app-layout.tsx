import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// history
import history from "../utils/history";

// redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../redux/rootReducer";

// actions
import { logOut } from "../redux/user/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// props
interface Props extends PropsFromRedux {}

const AppLayout: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <Button color="inherit" onClick={() => history.push("/app/home")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => history.push("/app/movies")}>
              Movies
            </Button>
          </div>
          <Typography variant="body2">{`Wellcome, ${props.user.user?.firstName}`}</Typography>
          <IconButton onClick={() => props.logOut()}>
            <ExitToAppIcon style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { user: state.user };
};

const connector = connect(mapStateToProps, { logOut });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppLayout);
