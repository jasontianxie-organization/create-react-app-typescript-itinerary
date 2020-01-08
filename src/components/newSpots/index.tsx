
import React from "react";
import "./index.module.scss";
import { Modal, Form, Row, Col, Upload, Button, Icon, Input } from "antd";
import MySelect from "@/components/mySelect";
import { FormComponentProps } from "antd/es/form";
import intl from "react-intl-universal";
import {request} from "@/fetchServerData/axios";

interface IUserFormProps extends FormComponentProps {
    wrappedComponentRef: any;
    visible: any;
    onCancel: any;
    onSave: any;
  }
interface IUserFormStates {
    [index: string]: any[];
  }

const NewSpots = Form.create<IUserFormProps>({ name: "new_spots" })(
    class extends React.Component<IUserFormProps, IUserFormStates> {
      public state: IUserFormStates = {
        level1DropDownData: [{id: 0, data: []}],
        level2DropDownData: [{id: 0, data: []}],
        level3DropDownData: [{id: 0, data: []}],
        level4DropDownData: [{id: 0, data: []}],
        level5DropDownData: [{id: 0, data: []}],
        level1DropDownCurrentData: [],
        level2DropDownCurrentData: [],
        level3DropDownCurrentData: [],
        level4DropDownCurrentData: [],
        level5DropDownCurrentData: [],
      };
      public handleSubmit() {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            // this.props.onSave();
          }
        });
      }
      public queryNextDropDownData(data: any) {
        if (data.id) { // 如果有id表示使用户点击选择的，如果没有id，表示用户没有点击下拉菜单中的选项
          const cachedData = this.state[`level${data.level + 1}DropDownData`].filter((item) => {
            return item.id === data.id;
          });
          if (cachedData.length) {
            this.setState({...this.state, [`level${data.level + 1}DropDownCurrentData`]: cachedData[0].data});
          } else {
            request.get(`/public/address/${data.id}.json`).then((res: any) => {
              const dropDownData = this.state[`level${data.level + 1}DropDownData`].concat([{id: data.id, data: res}]);
              this.setState({...this.state, [`level${data.level + 1}DropDownData`]: dropDownData, [`level${data.level + 1}DropDownCurrentData`]: res});
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      }
      public componentWillMount() {
        request.get("/public/address/1.json").then((data: any) => {
          this.setState({...this.state, level1DropDownData: [{id: 0, data}], level1DropDownCurrentData: data});
        });
      }
      public render() {
          const { visible, onCancel, onSave, form } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              width="680px"
              visible={visible}
              title={intl.get("components.newSpots.createNewSpot")}
              okText={intl.get("components.newSpots.save")}
              onCancel={onCancel}
              onOk={() => this.handleSubmit()}
            >
              <Form>
                <Form.Item>
                  <span>地点名称</span>
                </Form.Item>
                <Row>
                  <Col span={8}>
                    <Form.Item label={intl.get("components.newSpots.level1")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                      {getFieldDecorator("level1")(
                        <MySelect onChange={(val) => this.queryNextDropDownData({level: 1, ...val})} dropDownData={this.state.level1DropDownCurrentData}/>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={intl.get("components.newSpots.level2")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                      {getFieldDecorator("level2")(
                        <MySelect onChange={(val) => this.queryNextDropDownData({level: 2, ...val})} dropDownData={this.state.level2DropDownCurrentData}/>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={intl.get("components.newSpots.level3")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                      {getFieldDecorator("level3")(
                        <MySelect onChange={(val) => this.queryNextDropDownData({level: 3, ...val})} dropDownData={this.state.level3DropDownCurrentData}/>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Form.Item label={intl.get("components.newSpots.level4")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                      {getFieldDecorator("level4")(
                        <MySelect onChange={(val) => this.queryNextDropDownData({level: 4, ...val})} dropDownData={this.state.level4DropDownCurrentData}/>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={intl.get("components.newSpots.level5")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                      {getFieldDecorator("level5")(
                        <MySelect onChange={(val) => this.queryNextDropDownData({level: 5, ...val})} dropDownData={this.state.level5DropDownCurrentData}/>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={intl.get("components.newSpots.spotName")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                      {getFieldDecorator("spotName", {rules: [{ required: true, message: intl.get("components.newSpots.spotNameReminder")}]})(
                        <Input/>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
          );
        }
    },
  );

export default NewSpots;
