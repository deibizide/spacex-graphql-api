import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollPosition, setSrollPosition] = useState(0);
    const wrapperRef = useRef(null);

    const getRocketName = gql`
        {
            rockets {
                name
                id
            }
        }
    `;
    const handleScroll = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);
        setMenuOpen(false);
    };

    const handleClickOutside = e => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    // Scroll
    useEffect(() => {
        if (menuOpen) window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuOpen]);

    // Click Outside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Query query={getRocketName}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                return (
                    <Container ref={wrapperRef} fluid className="navBar__main-container m-4 ">
                        <Row>
                            <Col className="d-flex justify-content-between align-items-center">
                                <div onClick={() => setMenuOpen(!menuOpen)}>
                                    <div className="navBar__btn">
                                        <div className={`navBar__btn-burger ${menuOpen ? 'open ' : ''}`}></div>
                                    </div>
                                </div>
                                {data.rockets.map(rockets => (
                                    <div key={rockets.name}>
                                        <Link to={`/rocket/${rockets.id}`} className="m-0">
                                            {rockets.name.toUpperCase()}
                                        </Link>
                                    </div>
                                ))}
                                <SpaceXSvgLogo />
                            </Col>

                            <Col
                                sm={2}
                                className={`navBar__container mt-5 ${
                                    !menuOpen ? 'navBar__animation-right-left' : ''
                                } d-flex flex-column  position-absolute`}
                            >
                                <div onClick={() => setMenuOpen(!menuOpen)} className="d-flex flex-column m-4">
                                    <Link className="my-4" to="/missions">
                                        MISSIONS
                                    </Link>
                                    <Link to="/launches">PAST LAUNCHES</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                );
            }}
        </Query>
    );
};

export default NavBar;
