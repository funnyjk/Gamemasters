import React, {useState} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {Button} from "muicss/react";
import useAuthentication from "../../hooks/useAuthentication";
import './styles';
import Confirm from "../Confirm";

const Profile = () => {
  let history = useHistory();
  const auth = useAuthentication();
  const [viewDelete, setViewDelete] = useState(false);

  return <div>
    <div>
      <Confirm action={()=>auth.signout(() => {
        history.push("/")
      })} initState={false}>
        Sign Out
      </Confirm>

    </div>
    <div>
      <Confirm action={()=>auth.delete()} initState={false}>Delete Profile</Confirm>
    </div>


  </div>
};

export const AuthButton = () => {
  let history = useHistory();
  const auth = useAuthentication();
  return auth.isAuthenticated ? (
    <div className={"auth_button"}>
      <NavLink to={"/profile"} className={"mui-btn mui-btn--primary"}>{auth.user.username}</NavLink>

    </div>
  ) : (
    <div>You are not logged in.</div>
  );
};

export default Profile;