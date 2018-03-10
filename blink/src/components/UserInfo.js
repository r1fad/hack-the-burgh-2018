import React, { Component } from 'react';
import '../styles/home.css';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardTitle, CardText} from 'reactstrap';

class UserInfo extends Component{

  constructor(){
    super();

    this.state={
      name: 'Rifad',
      age: '19',
      id: 'X123WD'
    }
  }

  render(){
    return(
      <Container>
        <div className="home">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Name: {this.state.name}</CardTitle>
                <CardText>Age: {this.state.age}</CardText>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardText><b>ID: </b> {this.state.id}</CardText>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

}

export default UserInfo;
