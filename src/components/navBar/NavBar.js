import React, { useState } from 'react';
// component
import SpaceXSvgLogo from '../spaceXSvgLogo/SpaceXSvgLogo';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// scss
import './style.scss';

const NavBar = ({ getRocketId }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const getRocketName = gql`
        {
            rockets {
                name
                id
            }
        }
    `;
    return (
        <Query query={getRocketName}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                return (
                    <Container fluid className="navBar__main-container position-absolute m-4 ">
                        <Row>
                            <Col className="d-flex justify-content-between align-items-center  ">
                                <div onClick={() => setMenuOpen(!menuOpen)}>
                                    <div className="navBar__btn">
                                        <div className={`navBar__btn-burger ${menuOpen ? 'open ' : ''}`}></div>
                                    </div>
                                </div>
                                <SpaceXSvgLogo />
                            </Col>

                            <Col
                                className={`navBar__container mt-5 ${
                                    !menuOpen ? 'navBar__animation-right-left' : ''
                                } d-flex flex-column  position-absolute`}
                            >
                                {data.rockets.map(rockets => (
                                    <div key={rockets.name} className="m-4">
                                        <p onClick={() => getRocketId(rockets.id)}>{rockets.name.toUpperCase()}</p>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                );
            }}
        </Query>
    );
};

export default NavBar;
