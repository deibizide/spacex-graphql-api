import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import '../styles/index.scss';

const Rockets = () => (
    <Query
        query={gql`
            {
                rockets {
                    id
                    name
                    description
                    cost_per_launch
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>There is an erro {error} </p>;
            return data.rockets.map(rocket => <div key={rocket.id}></div>);
        }}
    </Query>
);

export default Rockets;
