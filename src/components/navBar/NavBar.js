import React, { useState, Fragment } from 'react';
// component
import SpaceXSvgLogo from '../spaceXSvgLogo/SpaceXSvgLogo';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
                    <Fragment>
                        <div className="d-flex justify-content-between align-items-center mx-4">
                            <div onClick={() => setMenuOpen(!menuOpen)}>
                                <div className="navBar__btn">
                                    <div className={`navBar__btn-burger ${menuOpen ? 'open ' : ''}`}></div>
                                </div>
                            </div>
                            <SpaceXSvgLogo />
                        </div>

                        <div
                            className={`navBar__container ${
                                !menuOpen ? 'navBar__animation-right-left' : ''
                            } d-flex flex-column w-25 `}
                        >
                            {data.rockets.map(rockets => (
                                <div key={rockets.name} className="m-4">
                                    <p onClick={() => getRocketId(rockets.id)}>{rockets.name.toUpperCase()}</p>
                                </div>
                            ))}
                        </div>
                    </Fragment>
                );
            }}
        </Query>
    );
};

export default NavBar;
