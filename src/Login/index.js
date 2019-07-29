import React from 'react';
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import './login.css';
import Service from '../_helpers/service';
import { storeToken } from '../_helpers/auth';

const service = new Service();

class Login extends React.Component {

  handleOtp = () => {
    this.props.history.push('/otp');
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        service.post('/auth/sign_in', values).then((res) => {
          console.log(res);
          storeToken(res.headers);
          this.props.history.push('/');
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Title } = Typography;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        lg: { span: 8, offset: 8 }
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
        <Title level={3} underline>Login</Title>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className="login-form-forgot" to="/reset_password">
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <Button type="primary" onClick={this.handleOtp} className="login-form-button">
            Log in with OTP
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedLogin = Form.create()(Login)

export default WrappedLogin;