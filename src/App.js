import React from 'react';
import Product from './components/Product';
//import dataProducts from 'http://localhost:4000/getdata01';
import axios from 'axios';
import { Row, Container } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const addProductAction = (product_name, product_price) => {
  return axios.post('/add', {
    product_name, product_price
  }).then(resp => resp.data)
}


const getProductData = () => {
  return axios.get('/getdata01')
    .then(res => res.data)
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
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

    const item = {};

    item.product_name = product_name;
    item.product_price = product_price;

    const dataTemp = this.state.data;

    if (item.product_name !== "") {
      dataTemp.push(item);
      this.setState({
        data: dataTemp
      })
    }

    addProductAction(product_name, product_price).then(response => {
      console.log(response)
    })
  }

  componentDidMount() {
    if (this.state.data === null) {
      getProductData().then(res => {
        this.setState({
          data: res
        })
      })
    }
  }

  render() {

    return (

      <Container>
        <h2>Welcome!!</h2>
        <Row>
          {
            this.state.data !== null ? (
              this.state.data.map((value, index) => {
                return <Product key={index} value={value} />
              })
            ) : ''
          }
        </Row>
        <Row>
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
        </Row>
      </Container>
    );
  }
}

export default App;
