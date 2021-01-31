import React from "react";
import "./index.module.scss";
import { withRouter } from "react-router-dom";
import intl from "react-intl-universal";
import {
    Form,
    Input,
    Row,
    Col,
    Checkbox,
    Button,
  } from "antd";

class RegistrationForm extends React.Component<any, any> {
    public state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    public handleSubmit = (e: any) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err: any, values: any) => {
        if (!err) {
          // tslint:disable-next-line:no-console
          console.log("Received values of form: ", values);
        }
      });
    }

    public handleConfirmBlur = (e: any) => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    public compareToFirstPassword = (rule: any, value: any, callback: any) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue("password")) {
        callback(intl.get("components.signup.reminder_comfirm_consistent"));
      } else {
        callback();
      }
    }

    public validateToNextPassword = (rule: any, value: any, callback: any) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }

    public handleWebsiteChange = (value: any) => {
      let autoCompleteResult: any;
      // tslint:disable-next-line:prefer-conditional-expression
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map((domain) => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }

    public render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit} styleName="signup-form">
          <Form.Item label={intl.get("components.signup.label_email")}>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: intl.get("components.signup.reminder_email"),
                },
                {
                  required: true,
                  message: intl.get("components.signup.reminder_empty_email"),
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={intl.get("components.signup.label_password")} hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: intl.get("components.signup.reminder_empty_password"),
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label={intl.get("components.signup.label_confirm_password")} hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: intl.get("components.signup.reminder_empty_password"),
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                {intl.get("components.signup.label_username")}
              </span>
            }
          >
            {getFieldDecorator("nickname", {
              rules: [{ required: true, message: intl.get("components.signup.reminder_username"), whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={intl.get("components.signup.label_captcha")} extra={intl.get("components.signup.reminder_captcha")}>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("captcha", {
                  rules: [{ required: true, message: intl.get("components.signup.reminder_empty_captcha") }],
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button>{intl.get("components.signup.btn_captcha")}</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
              rules: [{ required: true, message: intl.get("components.signup.reminder_check_agreement") }]
            })(
              <Checkbox>
                {intl.get("components.signup.label_read_agreement")} <a href="">{intl.get("components.signup.btn_agreement")}</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
            {intl.get("components.signup.btn_signup")}
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

const WrappedRegistrationForm = Form.create({ name: "register" })(withRouter(RegistrationForm));
export default WrappedRegistrationForm;
