import React, { Fragment } from 'react';
//components
import Loader from '../loader/Loader';
import RocketTechInfo from '../rocketTechInfo/RocketTechInfo';
import EngineTechInfo from '../engineTechInfo/EngineTechInfo';

// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// scss
import './style.scss';

const Rocket = ({ match }) => {
    let rocketId = match.params.id;

    const imgStyle = {
        backgroundImage: 'url(../assets/' + rocketId + '.jpg)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: '100vh',
    };

    const getRocketDescription = gql`
        query getRocket($rocketId: ID!) {
            rocket(id: $rocketId) {
                name
                height {
                    feet
                    meters
                }
                diameter {
                    feet
                    meters
                }
                success_rate_pct
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
        <Query query={getRocketDescription} variables={{ rocketId }}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <p>There is an error {error} </p>;

                return (
                    <Fragment>
                        <div className="rocket__container d-flex flex-column align-items-center justify-content-around">
                            <div className="d-flex flex-column justify-content-around w-100">
                                <div style={imgStyle} className="rocket__header">
                                    <div className="rocket__text position-absolute d-flex flex-column align-items-center">
                                        <h1 className="text-center">{data.rocket.name.toUpperCase()}</h1>
                                    </div>
                                </div>
                            </div>
                            <RocketTechInfo rocketTechData={data.rocket} />
                        </div>
                        <EngineTechInfo rocketEngineData={data.rocket.engines} />
                    </Fragment>
                );
            }}
        </Query>
    );
};

export default Rocket;
