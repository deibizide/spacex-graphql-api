import React from 'react';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// scss
import './style.scss';

const Rocket = ({ rocketId }) => {
    const getRocketDescription = gql`
        {
            rocket(id: "falconheavy") {
                name
                description
                height {
                    feet
                    meters
                }
                diameter {
                    feet
                    meters
                }
                payload_weights {
                    kg
                    name
                }
                cost_per_launch
                engines {
                    type
                    number
                    propellant_2
                    propellant_1
                }
            }
        }
    `;
    return (
        <Query query={getRocketDescription}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                const { name, description, height, diameter, payload_weights, cost_per_launch, engines } = data.rocket;
                return (
                    <div>
                        <p>{name}</p>
                        <p>{description}</p>
                    </div>
                );
            }}
        </Query>
    );
};

export default Rocket;
