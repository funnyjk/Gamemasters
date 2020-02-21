import gql from 'graphql-tag';

export interface LOGIN_RETURN {
  login: {
    token: string;
    user: any;
  }
}
export interface LOGIN_VARS {
  email: string;
  password: string;
}
export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user {
                id
                email
            }
        }
    }
`;

export interface SIGNUP_RETURN {
  register: {
    id: string;
    email: any;
  }
}
export interface SIGNUP_VARS {
  password: string;
  email: string;
}
export const SIGNUP = gql`
    mutation signup($password: String!, $email: String!){
        register(password: $password, email: $email) {
            id
            email
        }
    }
`;

export interface FORGOT_PASSWORD_VARS {
  email: string
}
export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
      forgotPassword(email: $email)
  }
`;

export interface RESET_PASSWORD_VARS {
  id: string;
  token: string;
  newPassword: string;
}
export const RESET_PASSWORD = gql`
    mutation resetPassword($id: ID!, $token: String!, $newPassword: String!) {
        resetPassword(id: $id, token: $token, newPassword: $newPassword)
    }
`;