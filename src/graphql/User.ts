import gql from 'graphql-tag';

export const GET_USER = gql`
    query {
        currentUser {
            id
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation {
        deleteProfile {
            id
        }
    }
`;

export interface CHANGE_PASSWORD_VARS {
    oldPassword: string;
    newPassword: string;
}
export const CHANGE_PASSWORD = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
    }
`;