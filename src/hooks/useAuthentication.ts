import {useContext} from "react";
import {AuthContext} from '../context/authenticationContext/context';
import {login, signOut} from "../context/authenticationContext/actions";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {DELETE_USER, GET_USER} from "../graphql/User";

export const useUser = () => {
  const {loading, error, data} = useQuery(GET_USER);
  if (!loading && !error && data) return data.currentUser;
  return {};
};

export const useAuthentication = () => {
  const [deleteProfile] = useMutation(DELETE_USER);
  const context = useContext(AuthContext);
  const {state, dispatch} = context;
  const user = useUser();
  if(!user) {
    dispatch(signOut())
  }

  return  {
    isAuthenticated: state.isAuthenticated,
    user,
    login: (token: string, cb: () => void = () => {
    }) => {
      dispatch(login(token));
      cb();

    },
    signout: (cb: () => void = ()=>{}) => {
      dispatch(signOut());
      cb();
    },
    delete: (cb: () => void = () => {}) => {
      deleteProfile().then(()=> {
        console.log("PROFILE DELETED");
        dispatch(signOut());
      });
      cb();
    }
  }

};

export default useAuthentication;