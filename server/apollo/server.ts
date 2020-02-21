// import {typeDefs} from "../database/generated/prisma/prisma-schema";
// import {
//   prisma,
// } from "../database/generated/prisma";
// import http from 'http';
// import express from 'express';
// import {ApolloServer, gql} from 'apollo-server-express';
// import {ApolloGateway} from "@apollo/gateway";
// import {resolvers} from "./schema/resolver";
//
// const PORT = 4141;
// // The ApolloServer constructor requires two parameters: your schema
// // definition and your set of resolvers.
//
// const gateway = new ApolloGateway({
//   serviceList: [
//     {name: 'gamemasters', url: 'http://localhost:4466/database/dev'}
//   ]
// });
// // const server = new ApolloServer({gateway, subscriptions: false});
//
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: {
//     prisma
//   }
// });
//
// const app = express();
//
// server.applyMiddleware({
//   app
// });
//
// const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer);
//
// httpServer.listen({port: PORT}, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
// });