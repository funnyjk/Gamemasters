import {hot} from 'react-hot-loader/root';

import React, {useContext, useReducer} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App';

import 'muicss/lib/sass/mui';
import Context from '../../context/pageContext/context';
import reducer from '../../context/pageContext/reducer';
import User from "../../pages/User";
import {AuthContextProvider} from '../../context/authenticationContext/context';
import MainApp from "../MainApp";
import PrivateRoute from "../PrivateRoute";

export const userPage = '/';

const App = () => {
  const pageInitState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, pageInitState);
  // useToken();
  return (
    <AuthContextProvider>
      <Context.Provider value={{state, dispatch}}>
        <Router>
          <Switch>
            <Route path="/(login|register|reset|forgot-password|testing)" component={User}/>
            <PrivateRoute path={['/:id', '/']} ><MainApp/></PrivateRoute>
          </Switch>
        </Router>
      </Context.Provider>
    </AuthContextProvider>
  );
}

export default hot(App);
