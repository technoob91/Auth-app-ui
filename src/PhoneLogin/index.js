import React from 'react';
import OtpInput from 'react-otp-input';
import { Input, Button, Row, Col } from 'antd';
import './index.css';
import Service from '../_helpers/service';

const service = new Service();

class PhoneLogin extends React.Component {
  state = {
    otp: '',
    phone: '',
    showOtp: false,
    showTextbox: true
  }

  requestOtp = (e) => {
    console.log(this.state.phone);
    service.get(`/phone_auth/send_otp?phone=${this.state.phone}`).then((res) => {
      console.log(res);
      this.setState({showOtp: true, showTextbox: false});
    })
  };

  verifyOtp = () => {
    service.post('/phone_auth/verify_otp', { phone: this.state.phone, otp: this.state.otp})
    .then((res) => {
      console.log(res);
    })
  }

  handleInputChange = (e) => this.setState({phone: e.target.value});

  handleChange = otp => {
    this.setState({otp}, console.log(this.state.otp));
  };

  render() {
    const formItemLayout = {
      xs: { span: 24 },
      sm: { span: 16 },
      lg: { span: 8, offset: 8 }      
    };
    const { showOtp, showTextbox, otp } = this.state;
    
    return (
      <div>
        {showTextbox && 
        <Row>
          <Col {...formItemLayout}>
            <Input name="phone" value={this.state.phone} onChange={this.handleInputChange} placeholder="Enter Phone Number" />
            <br/>
            <Button className="requestOtpButton" type="primary" onClick={this.requestOtp}>Send OTP</Button>
          </Col>
        </Row>}

        
        {showOtp &&
        <Row>
          <Col {...formItemLayout}>
            <OtpInput
              inputStyle={{
                width: '3rem',
                height: '3rem',
                margin: '0 1rem',
                fontSize: '2rem',
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.3)',
              }}
              onChange={this.handleChange}
              numInputs={6}
              separator={<span>-</span>}
              value={otp}
            />
            <Button className="requestOtpButton" type="primary" onClick={this.verifyOtp}>Verify OTP</Button>
          </Col>
        </Row>}
        
      </div>
      
    );
  }
}

export default PhoneLogin;