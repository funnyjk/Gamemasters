"use strict";
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var gateway_1 = require("@apollo/gateway");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//     # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//
//     # This "Book" type defines the queryable fields for every book in our data source.
//     type Book {
//         title: String
//         author: String
//     }
//
//     # The "Query" type is special: it lists all of the available queries that
//     # clients can execute, along with the return type for each. In this
//     # case, the "books" query returns an array of zero or more Books (defined above).
//     type Query {
//         books: [Book]
//     }
// `;
var books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling'
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton'
    },
];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
var resolvers = {
    Query: {
        books: function () { return books; }
    }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
var gateway = new gateway_1.ApolloGateway({
    serviceList: [
        { name: 'prisma', url: 'http://localhost:4466/database/dev' }
    ]
});
var server = new apollo_server_1.ApolloServer({ gateway: gateway });
// The `listen` method launches a web server.
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
