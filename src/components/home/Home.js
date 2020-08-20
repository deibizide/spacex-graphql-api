import React from 'react';
import { Link } from 'react-router-dom';

// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Col from 'react-bootstrap/Col';
// bootstrap - Components
import Image from 'react-bootstrap/Image';
// scss
import './style.scss';

const Home = () => {
    const getCompanyinfo = gql`
        {
            company {
                name
                summary
            }
        }
    `;
    return (
        <Query query={getCompanyinfo}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                return (
                    <div className="home__container ">
                        <Image fluid src={`../assets/homePicture.jpg`} alt="Space X Logo" />
                        <div className="home__company-info position-absolute">
                            <h1>{data.company.name.toUpperCase()}</h1>
                            <p>{data.company.summary}</p>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
};

export default Home;
