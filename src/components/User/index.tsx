import React, {useContext} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_USER} from "../../graphql/User";
import { Redirect, useHistory } from 'react-router-dom';
import Context from "../../context/pageContext/context";
import {userPage} from "../App";
import {Button} from "muicss/react";

interface IUser {

}

export const useUser = () => {
  const {state} = useContext(Context);
  const {isAuthenticated} = state
  if (!isAuthenticated) return <Redirect to={userPage}/>;
  return isAuthenticated;
};

const User = ({}: IUser) => {
  const history = useHistory();
  useUser();
  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.replace('/user');
  }
  // if(!isAuthenticated) return <Redirect to={'/login'}/>;

  const {error, loading, data} = useQuery(GET_USER);
  if (loading) return <div>Loading</div>;
  if (error) return <Redirect to={userPage}/>;
  if (!data) return <Redirect to={userPage}/>;

  return <div>
    {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    <a onClick={()=>signout()} href={'/'}><Button>Sign out</Button></a>
  </div>
};

export default User;

export const AuthButton = () => {
  let history = useHistory();

  return auth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          .signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}