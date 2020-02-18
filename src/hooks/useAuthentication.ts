// import {useCallback, useContext, useEffect, useState} from "react";
// import Context from "../context/pageContext/context";
// import {setAuth, setEdit, toggleAuth} from "../context/pageContext/actions";
//
// export const useAuthentication = (): [boolean, VoidFunction] => {
//   const {state, dispatch} = useContext(Context);
//   const {isAuthenticated} = state;
//   return [isAuthenticated, useCallback(() => {
//     return dispatch(toggleAuth())
//   }, [])];
// };
//
// export const useSetAuthentication = () => {
//   const {dispatch} = useContext(Context);
//   return useCallback((set: boolean) => {
//     return dispatch(setAuth(set))
//   }, []);
// };
//
// export const useToken = (): [any, any] => {
//   const {state, dispatch} = useContext(Context);
//   const[token, setToken] = useState(localStorage.getItem('token'));
//   useEffect(()=> {
//     if(token) {
//       localStorage.setItem('token', token);
//
//     } else {
//       localStorage.removeItem('token')
//     }
//     dispatch(setAuth(!!token))
//   }, [token]);
//
//   return [token, useCallback((newToken: string)=> {
//     setToken(newToken)
//   }, [])];
// };
//
// export const useUser = (): [any, any] => {
//   const[user, setUser] = useState(localStorage.getItem('user'));
//   useEffect(()=> {
//     if(user) {
//       localStorage.setItem('user', user);
//
//     } else {
//       localStorage.removeItem('user')
//     }
//   }, [user]);
//
//   return [user, useCallback((newUser: any)=> {
//     setUser(newUser)
//   }, [])];
// };