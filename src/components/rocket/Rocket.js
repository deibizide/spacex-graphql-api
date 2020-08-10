import React from 'react';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

// scss
import './style.scss';

const Rocket = ({ rocketId }) => {
    // console.log(rocketId);
    const getRocketDescription = gql`
        {
            rocket(id: "falcon9") {
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
        // <Query query={getRocketDescription} variables={{ rocketId }}>
        <Query query={getRocketDescription}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                const { name, description, height, diameter, payload_weights, cost_per_launch, engines } = data.rocket;
                return (
                    <div className="rocket__container d-flex align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <h1>{name.toUpperCase()}</h1>
                            <Col lg={8}>
                                <h5 className="text-center">{description}</h5>
                            </Col>
                        </div>
                        <div className="rocket__rocket-description d-flex justify-content-center">
                            <Image src="../assets/i.png" alt="Falcon 9" className="" />
                        </div>
                    </div>
                );
            }}
        </Query>
    );
};

export default Rocket;
