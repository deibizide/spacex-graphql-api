import React from 'react';
import { Link } from 'react-router-dom';

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
            launchesPast(limit: 6) {
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
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                return (
                    <Container className="launches__container ">
                        <div className="launches__title">
                            <h1>Launches</h1>
                        </div>
                        {data.launchesPast.map(launch => (
                            <Link
                                to={launch.links.article_link}
                                key={launch.id}
                                className={`launches__wrapper box-${launch.id}`}
                                target="_blank"
                                rel="noopener"
                            >
                                <Image src={`${launch.links.flickr_images}`} alt={launch.mission_name} />
                                <div className="launches__picture--title">
                                    <p>{launch.mission_name}</p>
                                </div>
                            </Link>
                        ))}
                    </Container>
                );
            }}
        </Query>
    );
};

export default Launches;
