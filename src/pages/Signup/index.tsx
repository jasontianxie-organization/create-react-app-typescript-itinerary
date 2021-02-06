import React from "react";
import "./index.module.scss";
import { withRouter } from "react-router-dom";
import {request} from "@/fetchServerData/axios";
import intl from "react-intl-universal";
import {
    Form,
    Input,
    Row,
    Col,
    Checkbox,
    Button,
    message,
  } from "antd";

let intervalObj = null;

class RegistrationForm extends React.Component<any, any> {
    public state = {
      confirmDirty: false,
      autoCompleteResult: [],
      countDownSec: 0,
    };

    public handleSubmit = (e: any) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err: any, values: any) => {
        if (!err) {
          // tslint:disable-next-line:no-console
          console.log("Received values of form: ", values);
          request.post("/api/users/signup", values).then((res: any) => {
            if (res.code === 0) {
              message.success(res.message);
              this.props.history.push("/signin");
            } else {
              message.error(res.message);
            }
          }).catch(() => {
            message.error("注册失败");
          });
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

    public countDownSec = () => {
      setTimeout(() => {
        if (this.state.countDownSec > 0) {
          this.setState({
            countDownSec: this.state.countDownSec - 1,
          }, () => this.countDownSec());
        }
    }, 1000);
    }

    public getCaptcha = async () => {
      try {
        const values = await this.props.form.validateFields(["email"]);
        this.setState({
          countDownSec: 60,
        }, () => this.countDownSec());
        request.get("http://129.28.183.129:3456/email_code", {
        params: {
          email: values.email,
        },
      }).then((res: any) => {
        if (res.code === 0) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
      } catch (errorInfo) {
        console.log(errorInfo);
      }
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
                <Button onClick={this.getCaptcha} disabled={this.state.countDownSec > 0}>
                  {intl.get("components.signup.btn_captcha")}{this.state.countDownSec > 0 ? `(${this.state.countDownSec})` : ""}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
              rules: [{ required: true, message: intl.get("components.signup.reminder_check_agreement") }],
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
