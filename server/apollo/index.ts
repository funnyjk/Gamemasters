import jwt from 'jsonwebtoken';

import {typeDefs as genTypes} from "../database/generated/prisma/prisma-schema";
import {typeDefs} from "./src/typeDefs";
import {prisma, User,} from "../database/generated/prisma";
import {ApolloServer} from 'apollo-server-express';
import {resolvers} from "./src/schema/resolver";

import express from 'express';
import fs from 'fs'
import https from 'https'
import http from 'http'

const configurations = {
    // Note: You may need sudo to run on port 443
    production: {
        ssl: true,
        port: 4000,
        hostname: 'gmmstrs.com',
        cors: 'https://gmmstrs.com'
    },
    development: {
        ssl: false,
        port: 4000,
        hostname: 'localhost',
        cors: 'http://localhost:8000'
    }
};
const environment  = process.env.NODE_ENV || 'production';
//@ts-ignore
const config = configurations[environment];

const getUser = (token: string) => {
    try {
        if (token) {
            return jwt.verify(token, 'test-secret')
        }
        return null
    } catch (err) {
        return null
    }
};

export interface ApolloContext {
    user: User;
    prisma: typeof prisma;
}

const apollo = new ApolloServer({
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

const app = express();
const corsOption = {
    origin: config.cors,
    credentials: true
}
apollo.applyMiddleware({app, cors: corsOption});


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/gmmstrs.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/gmmstrs.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/gmmstrs.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
let server;
if(config.ssl) {
    server = https.createServer(credentials, app)
} else {
    server = http.createServer(app)
}

server.listen({port: config.port}, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
)
