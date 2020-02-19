import React, {useContext} from 'react';
import {AuthContext} from '../../context/authenticationContext/context';
import { Route, Redirect } from 'react-router-dom';

interface IPrivateRoute {
  children: any;
  [name: string]: any;
}

const PrivateRoute = ({children, ...rest}: IPrivateRoute) => {
  const {state} = useContext(AuthContext);
  return <Route
    {...rest}
    render={({location}) =>
      state.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: location}
          }}
        />
      )
    }
  />
};

export default PrivateRoute;