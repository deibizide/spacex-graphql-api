import React from 'react';
import './styles/App.css';

//Components
import Rockets from './components/Rockets';

// 1
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// 2
const httpLink = createHttpLink({
    uri: 'https://api.spacex.land/graphql',
});

// 3
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const App = () => (
    <ApolloProvider client={client}>
        <Rockets />
    </ApolloProvider>
);

export default App;
