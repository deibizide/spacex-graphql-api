import React from 'react';
// bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
// scss
import './style.scss';

const RocketTechInfo = data => {
    const { name, height, diameter, success_rate_pct, cost_per_launch } = data.rocketTechData;
    return (
        <div className="d-flex flex-column justify-content-around w-100">
            <Container className="d-flex justify-content-between align-items-center flex-md-row flex-column p-5">
                <Col lg={8} md={7} sm={12} className="rocket__desc-container d-flex flex-column justify-content-center">
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
                    <Image src={`../assets/${name.replace(/\s+/g, '')}.png`} alt={name} />
                </Col>
            </Container>
        </div>
    );
};

export default RocketTechInfo;
