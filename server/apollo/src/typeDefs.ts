const {gql} = require('apollo-server');

export const typeDefs = gql`

    extend type Query {
        currentUser: User!
    }
    
    extend type Mutation {
        register(email: String!, password: String!): User!
        changePassword(oldPassword: String!, newPassword: String!): String!
        login(email: String!, password: String!): LoginResponse!
        deleteProfile: User!
        forgotPassword(email: String!): String!
        resetPassword(token: String!, id: ID!, newPassword: String!): String!
    }

    type LoginResponse {
        token: String
        user: User
    }
    
    type ChangePasswordResponse {
        status: String
        username: String
    }
  
#    TODO TEMPARARY
  type ForgotPassword {
      token: String!
      id: ID!
  }
`;