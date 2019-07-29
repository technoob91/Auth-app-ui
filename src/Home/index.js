import React, { Component } from 'react';
import { Row, Button } from 'antd';
import Service from '../_helpers/service';
import { removeToken } from '../_helpers/auth';

const service = new Service();

class Home extends Component {

  render() {
    const handleLogout = () => {
      service.delete('/auth/sign_out').then((res) => {
        console.log(res);
        removeToken();
        this.props.history.push('/');
      })
    }
    return (
      <div>
        <Row>
          <h2>You are logged in!!!!!!!</h2>
        </Row>
        <Row>
          <Button type="primary" onClick={handleLogout}>Logout</Button>
        </Row>
      </div>
    )
  }
}

export default Home;