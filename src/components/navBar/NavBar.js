/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
//components
import SpaceXSvgLogo from '../spaceXSvgLogo/SpaceXSvgLogo';
import Loader from '../loader/Loader';
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
    const [windowSize, setWindowSize] = useState({ width: undefined });

    const getRocketName = gql`
        {
            rockets {
                name
                id
            }
        }
    `;
    const getScreenSize = () => {
        setWindowSize({ width: window.innerWidth });
    };

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

    // Viewport
    useEffect(() => {
        getScreenSize();
        window.addEventListener('resize', getScreenSize);
        return () => window.removeEventListener('resize', getScreenSize);
    }, []);

    // Scroll
    useEffect(() => {
        if (menuOpen) window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, menuOpen]);

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
                if (loading) return <Loader />;
                if (error) return <p>There is an error {error} </p>;
                return (
                    <Container ref={wrapperRef} fluid className="navBar__container">
                        <Row>
                            <Col className="d-flex justify-content-between align-items-center position-absolute">
                                <div onClick={() => setMenuOpen(!menuOpen)} className="navBar__btn">
                                    <div className={`navBar__btn-burger ${menuOpen ? 'open ' : ''}`}></div>
                                </div>
                                {windowSize.width > 992 &&
                                    data.rockets.slice(1).map(rockets => (
                                        <div key={rockets.name} className="navBar__page-link">
                                            <Link
                                                onClick={() => setMenuOpen(false)}
                                                to={`/rocket/${rockets.id}`}
                                                className=" m-0"
                                            >
                                                {rockets.name.toUpperCase()}
                                            </Link>
                                        </div>
                                    ))}
                                <SpaceXSvgLogo />
                            </Col>

                            <div
                                className={`navBar__side-container position-absolute d-flex align-items-center justify-content-center text-center ${
                                    !menuOpen ? 'navBar__animation-right-left' : ''
                                } `}
                            >
                                <div
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="navBar__page-link d-flex flex-column"
                                >
                                    <Link to="/launches">PAST LAUNCHES</Link>
                                    {windowSize.width < 992 &&
                                        data.rockets.slice(1).map(rockets => (
                                            <div key={rockets.name} className="navBar__page-link">
                                                <Link onClick={() => setMenuOpen(false)} to={`/rocket/${rockets.id}`}>
                                                    {rockets.name.toUpperCase()}
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Row>
                    </Container>
                );
            }}
        </Query>
    );
};

export default NavBar;
