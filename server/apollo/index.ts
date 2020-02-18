import jwt from 'jsonwebtoken';

import {typeDefs as genTypes} from "../database/generated/prisma/prisma-schema";
import {typeDefs} from "./src/typeDefs";
import {prisma,} from "../database/generated/prisma";
import {ApolloServer} from 'apollo-server';
import {ApolloGateway} from "@apollo/gateway";
import {resolvers} from "./src/schema/resolver";

const getUser = (token: string) => {
    try {
        if (token) {
            return jwt.verify(token, 'test-secret')
        }
        return null
    } catch (err) {
        return null
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

// const gateway = new ApolloGateway({
//     serviceList: [
//         {name: 'gamemasters', url: 'http://localhost:4466/database/dev'}
//     ]
// });
// const server = new ApolloServer({gateway, subscriptions: false});

const server = new ApolloServer({
    typeDefs: [genTypes, typeDefs],
    resolvers,
    context: ({req}) => {
        const tokenWithBearer = req.headers.authorization || ''
        const token = tokenWithBearer.split(' ')[1]
        const user = getUser(token)
        return {
            user,
            prisma
        }
    }
});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

