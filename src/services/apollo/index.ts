import {InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import {setContext} from 'apollo-link-context';

import {gql} from "apollo-boost";

import {split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {config} from '../../config';
// Create an http link:
// const host = 'http://167.71.106.10';
// const uri = host + ':4000';
const httpLink = new HttpLink({
    uri: config().uri
  // uri
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//     uri: `ws://localhost:4466/database/dev`,
//     options: {
//         reconnect: true
//     }
// });

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
  },
  // wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

// client.query({
//     fetchPolicy: "no-cache",
//     query: gql`
//         {
//             players {
//                 name
//             }
//         }
//     `
// })
// .then(result => console.log(result));