import React from 'react';
import { Link } from 'react-router-dom';
//components
import Loader from '../loader/Loader';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Container from 'react-bootstrap/Container';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
// scss
import './style.scss';

const Launches = () => {
    const getLaunches = gql`
        {
            launchesPast(limit: 8) {
                id
                mission_name
                launch_site {
                    site_name_long
                }
                links {
                    article_link
                    flickr_images
                }
            }
        }
    `;
    return (
        <Query query={getLaunches}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <p>There is an error {error} </p>;
                return (
                    <div className="launches__container m-5">
                        <div className="launches__title">
                            <h1>Past Launches</h1>
                        </div>
                        {data.launchesPast.map(launch => (
                            <Link
                                to={{ pathname: launch.links.article_link }}
                                key={launch.id}
                                className={`launches__wrapper box-${launch.id}`}
                                target="_blank"
                                rel="noopener"
                            >
                                <Image src={`${launch.links.flickr_images}`} alt={launch.mission_name} />
                                <div className="launches__picture--title">
                                    <h6>{launch.mission_name.slice(0, 10)}</h6>
                                    <p>{launch.launch_site.site_name_long}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                );
            }}
        </Query>
    );
};

export default Launches;
