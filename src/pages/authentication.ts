import gql from 'graphql-tag';

export interface LOGIN_RETURN {
  login: {
    token: string;
    user: any;
  }
}
export interface LOGIN_VARS {
  username: string;
  password: string;
}
export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;

export interface SIGNUP_RETURN {
  register: {
    id: string;
    username: any;
  }
}
export interface SIGNUP_VARS {
  username: string;
  password: string;
  email: string;
}
export const SIGNUP = gql`
    mutation signup($username: String!, $password: String!, $email: String!){
        register(username: $username, password: $password, email: $email) {
            id
            username
        }
    }
`;