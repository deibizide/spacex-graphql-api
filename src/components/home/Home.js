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

const Home = () => {
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
                    <Container className="home__container ">
                        {data.launchesPast.map(launch => (
                            <a
                                href={launch.links.article_link}
                                key={launch.id}
                                className={`home__wrapper box-${launch.id}`}
                                target="_blank"
                                rel="noopener"
                            >
                                <Image src={`${launch.links.flickr_images}`} alt={launch.mission_name} />
                                <div className="home__title">
                                    <p>{launch.mission_name}</p>
                                </div>
                            </a>
                        ))}
                    </Container>
                );
            }}
        </Query>
    );
};

export default Home;

// <div className="item item1">1</div>
//                 <div className="item item2">2</div>
//                 <div className="item item3">3</div>
//                 <div className="item item4">4</div>
//                 <div className="item item5">5</div>
//                 <div className="item item6">6</div>
//                 <div className="item item7">7</div>
