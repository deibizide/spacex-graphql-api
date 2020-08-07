import React, { useState, Fragment } from 'react';
// component
import SpaceXSvgLogo from '../spaceXSvgLogo/SpaceXSvgLogo';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// scss
import './style.scss';
// font awesome

const getRocketName = gql`
    {
        rockets {
            name
        }
    }
`;

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <Query query={getRocketName}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an erro {error} </p>;
                return (
                    <Fragment>
                        <div className="navBar__header d-flex justify-content-between align-items-center mx-5">
                            <div onClick={toggleMenuOpen}>
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
                            {data.rockets.map(rocket => (
                                <div key={rocket.name} className="m-4">
                                    <a href={rocket.name.replace(/\s/g, '').toLowerCase()}>
                                        {rocket.name.toUpperCase()}
                                    </a>
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

// Rockets query
// {
//   rockets(limit: 1) {
//     name
//     description
//     height {
//       feet
//       meters
//     }
//     diameter {
//       feet
//       meters
//     }
//     payload_weights {
//       kg
//       name
//     }
//     cost_per_launch
//     engines {
//       type
//       number
//       propellant_2
//       propellant_1
//     }
//   }
// }
