import React from 'react';
// bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// scss
import './style.scss';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

const EngineTechInfo = data => {
    const { type, number, propellant_2, propellant_1 } = data.rocketEngineData;
    return (
        <div className="engineTechInfo__container">
            <Container className="d-flex justify-content-between align-items-center flex-md-row flex-column p-5">
                <Col sm={2} className="d-flex justify-content-center">
                    <Image src={`../assets/${type.replace(/\s+/g, '')}.png`} className="w-100 pb-4" alt={type} />
                </Col>
                <Col lg={8} md={7} sm={12} className="d-flex flex-column justify-content-center">
                    <h5>{type.toUpperCase()}</h5>
                    <h1>OVERVIEW</h1>
                    <Table>
                        <tbody>
                            <tr>
                                <td>NUMBER</td>
                                <td>{number}</td>
                            </tr>
                            <tr>
                                <td>PROPELLANT 1</td>
                                <td>{propellant_1}</td>
                            </tr>
                            <tr>
                                <td>PROPELLANT 2</td>
                                <td>{propellant_2} </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Container>
        </div>
    );
};

export default EngineTechInfo;
