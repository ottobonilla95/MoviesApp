import React, { FunctionComponent } from "react";

// router
import { Route, Switch, Redirect, RouteChildrenProps } from "react-router-dom";

// dynamic components
const LogInView = React.lazy(() => import("./login"));
const SignUpView = React.lazy(() => import("./signup"));

interface Props extends RouteChildrenProps {}

const UserMainComponent: FunctionComponent<Props> = (props) => {
  return (
    <Switch>
      <Route path={`${props.match?.path}/`} exact>
        <Redirect to={`${props.match?.path}/login`} />
      </Route>
      <Route path={`${props.match?.path}/login`} component={LogInView} />
      <Route path={`${props.match?.path}/signup`} component={SignUpView} />
    </Switch>
  );
};

export default UserMainComponent;
