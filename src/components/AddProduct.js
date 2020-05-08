import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const addProductAction = (product_name, product_price) => {
    return axios.post('/add', {
        product_name, product_price
    }).then(resp => resp.data)
}

class AddProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product_name: '',
            product_price: ''
        }
    }

    onChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    onSubmit = (event) => {
        event.preventDefault();
    }

    onClick = () => {
        const { product_name, product_price } = this.state;

        const dataTemp = [];

        const item = {};

        item.product_name = product_name;
        item.product_price = product_price;

        dataTemp = this.state.data;

        if (item.product_name !== "") {
            dataTemp.push(item);
            this.setState({
                data: dataTemp
            })
        }

        console.log(this.state.data)

        addProductAction(product_name, product_price).then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                        type="text"
                        name="product_name"
                        id="exampleEmail"
                        placeholder="name"
                        onChange={this.onChange}
                        value={this.state.product_name}
                        required
                    />
                </FormGroup>
                <FormGroup onSubmit={this.onSubmit}>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="text"
                        name="product_price"
                        id="examplePassword"
                        placeholder="price"
                        onChange={this.onChange}
                        value={this.state.product_price}
                        required
                    />
                </FormGroup>

                <Button type="reset" onClick={this.onClick}>Submit</Button>
            </Form>
        );
    }
}

export default AddProduct;
