import React, { Component } from 'react';
import { Row, Col, Input, Button, message, Form } from 'antd';
import Service from '../_helpers/service';
import { storeToken } from '../_helpers/auth';
import ChangePasswordComponent from './changePasswordComponent';
import queryString from 'query-string';

const service = new Service();

class ResetPassword extends Component {
  state = {
    email: '',
    showChangePassword: false
  }

  componentDidMount(){
    const { search } = this.props.location;
    console.log(this.props);
    if(search){
      const params = queryString.parse(this.props.location.search);
      storeToken(params);
      this.setState({ showChangePassword: true })
    }
  }
  
  handleInputChange = (e) => this.setState({ email: e.target.value });

  resetPasswordRequest = () => {
    service.post('/auth/password', { email: this.state.email }).then((res) => {
      console.log(res);
      message.success(res.data.message);
      this.props.history.push('/login');
    });
  };

  render(){
    const formItemLayout = {
      xs: { span: 24 },
      sm: { span: 16 },
      lg: { span: 8, offset: 8 }      
    };
    const { showChangePassword } = this.state;
    return (
      <div>
        
        {!showChangePassword &&
        <Row>
          <Col {...formItemLayout}>
            <Input name="phone" value={this.state.email} onChange={this.handleInputChange} placeholder="Enter email address" />
            <br/>
            <Button className="requestOtpButton" type="primary" onClick={this.resetPasswordRequest}>Reset Password</Button>
          </Col>
        </Row>}

        { showChangePassword && <ChangePasswordComponent></ChangePasswordComponent> }
      </div>  
    )
  }
}

export default ResetPassword;