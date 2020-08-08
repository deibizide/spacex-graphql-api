import React, { useState } from 'react';
//Components
import NavBar from './components/navBar/NavBar';
import Rocket from './components/rocket/Rocket';
// Apollo
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'https://api.spacex.land/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const App = () => {
    const [rocketId, setRocketId] = useState('');
    const getRocketId = id => {
        setRocketId(id);
    };

    return (
        <div id="app">
            <ApolloProvider client={client}>
                <NavBar getRocketId={getRocketId} />
                <Rocket rocketId={rocketId} />
            </ApolloProvider>
        </div>
    );
};

export default App;
