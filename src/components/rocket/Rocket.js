import React from 'react';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
// scss
import './style.scss';

const Rocket = ({ rocketId }) => {
    // console.log(rocketId);
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
            {/* <Query query={getRocketDescription}> */}
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                const { name, description, height, diameter, success_rate_pct, cost_per_launch, engines } = data.rocket;
                return (
                    <Container fluid className="rocket__container d-flex align-items-center justify-content-around">
                        <Row className="d-flex justify-content-around">
                            <div className="rocket__header ">
                                <Image src="../assets/falcon_9.jpeg" fluid alt="Header picture Falcon 9" />
                                <div className="rocket__text position-relative d-flex flex-column align-items-center">
                                    <h1 className="text-center">{name}</h1>
                                </div>
                            </div>
                            <Col sm={5} className="rocket__desc-container d-flex flex-column justify-content-center">
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
                                <Image src="../assets/falcon9.png" alt="Falcon 9" />
                                {/* <Image src="../assets/starship.png" alt="Falcon 9" className="" /> */}
                                {/* <Image src="../assets/falconHeavy.png" alt="Falcon 9" className="" /> */}
                            </Col>
                        </Row>
                    </Container>
                );
            }}
        </Query>
    );
};

export default Rocket;
