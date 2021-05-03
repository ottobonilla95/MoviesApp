import React, { FunctionComponent } from "react";

// router
import { Route, Redirect } from "react-router-dom";

interface Props {
  component: any;
  authUser: boolean;
  path: string;
}

const ProtectedRoute: FunctionComponent<Props> = ({
  component: Component,
  authUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
