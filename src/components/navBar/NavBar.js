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
                    <Container ref={wrapperRef} fluid className="navBar__main-container">
                        <Row>
                            <Col className="d-flex justify-content-between align-items-center position-absolute">
                                <div onClick={() => setMenuOpen(!menuOpen)} className="navBar__btn">
                                    <div className={`navBar__btn-burger ${menuOpen ? 'open ' : ''}`}></div>
                                </div>

                                {data.rockets.slice(1).map(rockets => (
                                    <div key={rockets.name} className="navBar__page-link">
                                        <Link to={`/rocket/${rockets.id}`} className=" m-0">
                                            {rockets.name.toUpperCase()}
                                        </Link>
                                    </div>
                                ))}
                                <SpaceXSvgLogo />
                            </Col>

                            <Col
                                xs={7}
                                sm={5}
                                md={4}
                                lg={2}
                                className={`navBar__container position-absolute d-flex align-items-center justify-content-center ${
                                    !menuOpen ? 'navBar__animation-right-left' : ''
                                } `}
                            >
                                <div
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="navBar__page-link d-flex flex-column"
                                >
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
