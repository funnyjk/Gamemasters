import {useContext} from "react";
import {AuthContext} from '../context/authenticationContext/context';
import {login, signOut} from "../context/authenticationContext/actions";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CHANGE_PASSWORD, CHANGE_PASSWORD_VARS, DELETE_USER, GET_USER} from "../graphql/User";
import {User} from "../../server/database/generated/prisma";

export const useUser = () => {
  const {loading, error, data} = useQuery(GET_USER);
  if (!loading && !error && data) return data.currentUser;
  return {};
};

export interface Authentication {
  isAuthenticated: boolean;
  user: User;
  login: (token: string, cb?: () => void) => void;
  signout: (cb?: () => void) => void;
  changePassword: (oldPassword: string, newPassword: string, cb?: () => void) => void;
  delete: (cb?: () => void) => void;
}

export const useAuthentication = (): Authentication => {
  const [deleteProfile] = useMutation(DELETE_USER);
  const [changeUserPassord] = useMutation<any, CHANGE_PASSWORD_VARS>(CHANGE_PASSWORD);
  const context = useContext(AuthContext);
  const {state, dispatch} = context;
  const user = useUser();
  if(!user) {
    dispatch(signOut())
  }

  return  {
    isAuthenticated: state.isAuthenticated,
    user,
    login: (token, cb = () => {
    }) => {
      dispatch(login(token));
      cb();

    },
    signout: (cb = ()=>{}) => {
      dispatch(signOut());
      cb();
    },
    changePassword: (oldPassword, newPassword, cb = ()=>{}) => {
      changeUserPassord({
        variables: {
          oldPassword,
          newPassword
        }
      });
      cb();
    },
    delete: (cb = () => {}) => {
      deleteProfile().then(()=> {
        console.log("PROFILE DELETED");
        dispatch(signOut());
      });
      cb();
    }
  }

};

export default useAuthentication;