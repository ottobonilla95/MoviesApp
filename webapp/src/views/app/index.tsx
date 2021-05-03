import React, { FunctionComponent } from "react";

// material ui
import Container from "@material-ui/core/Container";

// router
import { Route, Switch, Redirect, RouteChildrenProps } from "react-router-dom";

// components
import AppLayout from "../../layout/app-layout";

// dynamic components
const HomeView = React.lazy(() => import("./home"));
const MoviesView = React.lazy(() => import("./movies"));

interface Props extends RouteChildrenProps {}

const App: FunctionComponent<Props> = (props) => {
  return (
    <AppLayout>
      <Container style={{marginTop:"20px"}}>
        <Switch>
          <Route path={`${props.match?.path}/`} exact>
            <Redirect to={`${props.match?.path}/home`} />
          </Route>
          <Route path={`${props.match?.path}/home`} component={HomeView} />
          <Route path={`${props.match?.path}/movies`} component={MoviesView} />
        </Switch>
      </Container>
    </AppLayout>
  );
};

export default App;
