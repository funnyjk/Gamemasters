import gql from 'graphql-tag';

export const GET_USER = gql`
    query {
        currentUser {
            id
            username
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