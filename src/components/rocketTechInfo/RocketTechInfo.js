import React from 'react';
// bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
// scss
import './style.scss';

const RocketTechInfo = ({ name, height, diameter, stages, cost_per_launch, engines }) => {
    return (
        <div className="d-flex flex-column justify-content-around w-100 rocketTechInfo__rocket">
            <Container
                className={`d-flex ${
                    name ? 'flex-md-row' : 'flex-md-row-reverse'
                } justify-content-between flex-column py-5`}
            >
                <Col lg={6} md={7} sm={12} className="rocket__desc-container d-flex flex-column justify-content-center">
                    <h5>{name ? name.toUpperCase() : engines.type.toUpperCase()}</h5>
                    <h1>OVERVIEW</h1>
                    <Table>
                        <tbody>
                            <tr className="rocketTechInfo__first-table-row">
                                <td>{height ? 'HEIGHT' : 'NUMBER'}</td>
                                <td> {`${height ? height.meters + ' m/ ' + height.feet + ' /ft' : engines.number}`}</td>
                            </tr>
                            <tr>
                                <td>{diameter ? 'DIAMETER' : 'PROPELLANT 1'}</td>
                                <td>
                                    {`${
                                        diameter
                                            ? diameter.meters + ' m/ ' + diameter.feet + ' /ft'
                                            : engines.propellant_1
                                    }`}
                                </td>
                            </tr>
                            <tr>
                                <td>{stages ? 'STAGES' : 'PROPELLANT 2'}</td>
                                <td>{stages ? stages : engines.propellant_2} </td>
                            </tr>
                            <tr>
                                <td>{cost_per_launch ? 'COST PER LAUNCH' : 'THRUST TO WEIGHT'}</td>
                                <td>{cost_per_launch ? cost_per_launch : engines.thrust_to_weight} </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Image
                        src={`../assets/${name ? name.replace(/\s+/g, '') : engines.type.replace(/\s+/g, '')}.png`}
                        alt={name ? name : engines.type}
                    />
                </Col>
            </Container>
        </div>
    );
};

export default RocketTechInfo;
