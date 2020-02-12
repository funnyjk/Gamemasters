import {InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import {gql} from "apollo-boost";

const uri = 'http://localhost:4000';

export const client = new ApolloClient({
    uri: uri,
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