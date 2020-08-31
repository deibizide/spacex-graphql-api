import React from 'react';
//components
import Loader from '../loader/Loader';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
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
                description
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
                const { name, height, diameter, success_rate_pct, cost_per_launch } = data.rocket;
                return (
                    <div className="rocket__container d-flex align-items-center justify-content-around">
                        <div className="d-flex flex-column justify-content-around w-100">
                            <div style={imgStyle} className="rocket__header ">
                                <div className="rocket__text position-absolute d-flex flex-column align-items-center">
                                    <h1 className="text-center">{name.toUpperCase()}</h1>
                                </div>
                            </div>
                            <Container className="d-flex justify-content-between align-items-center flex-md-row flex-column p-5">
                                <Col
                                    lg={8}
                                    md={7}
                                    sm={12}
                                    className="rocket__desc-container d-flex flex-column justify-content-center"
                                >
                                    <h5>{name.toUpperCase()}</h5>
                                    <h1>OVERVIEW</h1>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>HEIGHT</td>
                                                <td>
                                                    {height.meters} m / <span>{height.feet} ft</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>DIAMETER</td>
                                                <td>
                                                    {diameter.meters} m / <span>{height.feet} ft</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>SUCCESS RATE</td>
                                                <td>{success_rate_pct} %</td>
                                            </tr>
                                            <tr>
                                                <td>COST PER LAUNCH</td>
                                                <td>{cost_per_launch} USD</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col sm={2} className="rocket__rocket-description d-flex justify-content-center">
                                    <Image src={`../assets/${rocketId}.png`} alt={rocketId} />
                                </Col>
                            </Container>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
};

export default Rocket;
