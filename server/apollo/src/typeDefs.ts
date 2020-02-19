const {gql} = require('apollo-server');

export const typeDefs = gql`

    extend type Query {
        currentUser: User!
    }
    
    extend type Mutation {
        register(username: String!, password: String!, email: String!): User!
        login(username: String!, password: String!): LoginResponse!
        deleteProfile: User!
    }

    type LoginResponse {
        token: String
        user: User
    }
`;