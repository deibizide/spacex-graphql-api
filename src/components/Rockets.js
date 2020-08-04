import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import Rocket from './Rocket';

const Rockets = () => (
    <Query
        query={gql`
            {
                capsules {
                    id
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>There is an erro {error} </p>;
            return data.capsules.map(elem => (
                <div key={elem.id}>
                    <p>{elem.id}</p>
                </div>
            ));
        }}
    </Query>
);

export default Rockets;
