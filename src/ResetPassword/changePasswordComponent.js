import React from 'react';
import { Form, Input, Typography, Button, message } from 'antd';
import { withRouter} from 'react-router-dom';
import Service from '../_helpers/service';

const service = new Service();

class ChangePasswordComponent extends React.Component {

  state = {

  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        service.put('/auth/password', values).then((res) => {
          console.log(res);
          if(res.data.success){
            message.success(res.data.message);
            this.props.history.push('/login');
          }
        });
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { Title } = Typography;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        lg: { span: 4, offset: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        lg: { span: 8 }
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
        lg: { span: 8, offset: 8 }
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Title level={3} underline>Change Password</Title>
        <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('password_confirmation', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
    )
  }
  
}

const PasswordResetForm = Form.create({ name: 'change_password' })(ChangePasswordComponent);

export default withRouter(PasswordResetForm);