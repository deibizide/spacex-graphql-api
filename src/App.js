import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Components
import NavBar from './components/navBar/NavBar';
import Launches from './components/launches/Launches';
import Home from './components/home/Home';
import Rocket from './components/rocket/Rocket';
import Loader from './components/loader/Loader';

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
        <ApolloProvider client={client}>
            <Router>
                <div id="app">
                    <NavBar getRocketId={getRocketId} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/launches" component={Launches} />
                        <Route exact path="/rocket/:id" component={Rocket} />
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
};

export default App;
