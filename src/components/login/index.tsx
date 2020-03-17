import React from "react";
import "./index.module.scss";
import { Modal, Form, Button, Icon, Input, Checkbox } from "antd";
import { connect } from "react-redux";

class NormalLoginForm extends React.Component<any, any> {
  public handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  public handleOk(e: any) {
  };

  public handleCancel(e: any) {
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
          title="Basic Modal"
          visible={this.props.showLogin}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Form onSubmit={this.handleSubmit} styleName="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
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
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    showLogin: state.users.loggedin,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    // onIncreaseClick: () => dispatch({}),
  };
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
