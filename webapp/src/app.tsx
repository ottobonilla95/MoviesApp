import React, { FunctionComponent, Suspense } from "react";

// router
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { RootState } from "./redux/rootReducer";

// history
import history from "./utils/history";

// protected routes
import ProtectedRoute from "./utils/ProtectedRoute";

// redux
import { connect, ConnectedProps } from "react-redux";

// actions
import { autoLogin } from "./redux/user/actions";

// material ui
import CircularProgress from "@material-ui/core/CircularProgress";

// dynamic components
const AppViews = React.lazy(() => import("./views/app"));
const UserViews = React.lazy(() => import("./views/user"));

interface Props extends PropsFromRedux {}

const App: FunctionComponent<Props> = (props) => {
  const userInStorage = localStorage.getItem("user");

  if (props.user.user === undefined && userInStorage) {
    const user = JSON.parse(userInStorage);
    props.autoLogin(user.user);

    return <CircularProgress />;
  }

  return (
    <>
      <Suspense fallback="loading...">
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/app" />
            </Route>
            <ProtectedRoute
              path="/app"
              component={AppViews}
              authUser={props.user.user !== undefined}
            />
            <Route path="/user" component={UserViews} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return state;
};

const connector = connect(mapStateToProps, { autoLogin });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
