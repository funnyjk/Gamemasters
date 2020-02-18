export const LOGIN = "LOGIN";
export const SIGN_OUT = "SIGN_OUT";

export const login = (payload: string) => {
  return {
    type: LOGIN,
    payload
  }
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
};