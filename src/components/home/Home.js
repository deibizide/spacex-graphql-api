import React from 'react';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
// scss
import './style.scss';

const Home = () => {
    const getLaunches = gql`
        {
            launchesPast(limit: 4) {
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
                    <div className="home__container">
                        {data.launchesPast.map(launch => (
                            <div key={launch.id} className="home__wrapper">
                                <div className={`home__image-title-container box-${launch.id}`}>
                                    <Image src={`${launch.links.flickr_images}`} fluid alt={launch.mission_name} />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }}
        </Query>
    );
};

export default Home;
