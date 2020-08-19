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
    return (
        <Col className="home__container ">
            <Image fluid src={`../assets/homePicture.jpg`} alt="Space X Logo" />
        </Col>
    );
};

export default Home;
