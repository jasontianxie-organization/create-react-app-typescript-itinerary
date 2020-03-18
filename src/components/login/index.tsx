import React from "react";
import "./index.module.scss";
import { Modal, Form, Button, Icon, Input, Checkbox } from "antd";
import { connect } from "react-redux";
import { login } from "@/redux/actions/users";

class NormalLoginForm extends React.Component<any, any> {
  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.login(values);
      }
    });
  }
  public onCancel() {
    this.props.hideLogin();
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        footer={null}
        title="Basic Modal"
        onCancel={() => this.onCancel()}
        visible={this.props.showLogin}
      >
        <Form onSubmit={(e) => this.handleSubmit(e)} styleName="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username!" }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
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
    showLogin: state.users.showLogin,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    login: (data: any) => dispatch(login(data)),
    hideLogin: () => dispatch({type: "HIDE_LOGIN"}),
  };
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
