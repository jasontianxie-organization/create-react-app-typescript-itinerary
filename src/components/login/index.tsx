import React from "react";
import "./index.module.scss";
import { Modal, Form, Button, Icon, Input, Checkbox } from "antd";
import { connect } from "react-redux";
import { login } from "@/redux/actions/users";
import intl from "react-intl-universal";

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
        title={intl.get("components.login.title")}
        onCancel={() => this.onCancel()}
        visible={this.props.showLogin}
      >
        <Form onSubmit={(e) => this.handleSubmit(e)} styleName="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: intl.get("components.login.reminder_username") }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder={intl.get("components.login.plhr_username")}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: intl.get("components.login.reminder_password") }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder={intl.get("components.login.plhr_password")}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox>{intl.get("components.login.label_remember_me")}</Checkbox>)}
            <a className="login-form-forgot" href="">
              {intl.get("components.login.label_forgot")}
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              {intl.get("components.login.label_login")}
            </Button>
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
