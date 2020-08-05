import React from 'react';

//Components
import NavBar from './components/navBar/NavBar';

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
    <div id="app">
        <ApolloProvider client={client}>
            <NavBar />
        </ApolloProvider>
    </div>
);

export default App;
