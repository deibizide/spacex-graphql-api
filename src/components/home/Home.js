import React from 'react';
// graphql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// scss
import './style.scss';

const Home = () => {
    const GET_COMPANY_INFO = gql`
        {
            company {
                name
                summary
            }
        }
    `;
    return (
        <Query query={GET_COMPANY_INFO}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>There is an error {error} </p>;
                return (
                    <div className="home__container d-flex align-items-center">
                        <Container className="home__company-info">
                            <Row className="justify-content-center text-center ">
                                <Col>
                                    <h1>{data.company.name.toUpperCase()}</h1>
                                    <p>{data.company.summary}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                );
            }}
        </Query>
    );
};

export default Home;
