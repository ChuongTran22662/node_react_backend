import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';

class Product extends Component {
    render() {

        const { value } = this.props;

        return (
            <Col xs="6">
                <Card body>
                    <CardTitle>{value.product_name}</CardTitle>
                    <CardText>{value.product_price}</CardText>
                    <Button>Go somewhere</Button>
                </Card>
            </Col>
        );
    }
}

export default Product;
