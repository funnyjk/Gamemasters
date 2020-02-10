import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {ApolloProvider} from '@apollo/react-hooks';
import {client} from "./services/apollo";

const MyApp = () => <ApolloProvider client={client}>
    <App/>
</ApolloProvider>;

ReactDOM.render(<MyApp />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
