import React from "react";
import "./index.module.scss";
import { Form, Button, Icon, Input, Checkbox } from "antd";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { login } from "@/redux/actions/users";
import intl from "react-intl-universal";

class NormalLoginForm extends React.Component<any, any> {
  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.login(values);
        // console.log(this.props.location.search.split("redirect=")[1]);
        // this.props.history.push(this.props.location.search.split("redirect=")[1]);
      }
    });
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
        this.props.userData ? <Redirect to={this.props.location.search.split("redirect=")[1]}/> :
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
    );
  }
}

function mapStateToProps(state: any) {
  return { userData: state.users.data };
}

function mapDispatchToProps(dispatch: any) {
  return {
    login: (data: any) => dispatch(login(data)),
  };
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(withRouter(NormalLoginForm));
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
