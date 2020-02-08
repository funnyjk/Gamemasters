import {typeDefs} from "../database/generated/prisma/prisma-schema";
import {
    prisma,
} from "../database/generated/prisma";
import {ApolloServer, gql} from 'apollo-server';
import {ApolloGateway} from "@apollo/gateway";
import {resolvers} from "./schema/resolver";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const gateway = new ApolloGateway({
    serviceList: [
        {name: 'gamemasters', url: 'http://localhost:4466/database/dev'}
    ]
});
// const server = new ApolloServer({gateway, subscriptions: false});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma
    }
});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

