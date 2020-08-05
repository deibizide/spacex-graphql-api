import React from 'react';
// component
import SpaceXSvgLogo from '../spaceXSvgLogo/SpaceXSvgLogo';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// scss
import './style.scss';
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const getRocketName = gql`
    {
        rockets {
            name
        }
    }
`;

const handleSideToggle = () => {
    console.log('hello');
};

const NavBar = () => {
    return (
        <div>
            <Query query={getRocketName}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>There is an erro {error} </p>;
                    return (
                        <div className="">
                            <div className="row">
                                <div className="col-9 d-flex justify-content-between">
                                    <SpaceXSvgLogo />
                                    <FontAwesomeIcon
                                        onClick={handleSideToggle}
                                        icon={faBars}
                                        size="2x"
                                        className="m-4 navBar__burger-menu"
                                    />
                                </div>
                                <div className="navBar__container col-3 d-flex flex-column align-items-end">
                                    {data.rockets.map(rocket => (
                                        <div key={rocket.name} className="m-4 ">
                                            <a href={rocket.name.replace(/\s/g, '').toLowerCase()}>
                                                {rocket.name.toUpperCase()}
                                            </a>
                                            <div className="navBar__border"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        </div>
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
