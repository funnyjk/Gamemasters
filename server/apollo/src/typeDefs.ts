// import {typeDefs as genType} from '../../database/generated/prisma/prisma-schema';
const {gql} = require('apollo-server');

export const typeDefs = gql`

    extend type Query {
        currentUser: User!
    }
    
    extend type Mutation {
        register(username: String!, password: String!): User!
        login(username: String!, password: String!): LoginResponse!
        createPlayerNoUser(name: String!): Player!
    }

    type LoginResponse {
        token: String
        user: User
    }
`;