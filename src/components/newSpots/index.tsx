
import React from "react";
import "./index.module.scss";
import { Modal, Form, Row, Col, Select, Button, Icon, Input, DatePicker } from "antd";
import MySelect from "@/components/mySelect";
import ItineraryEditor from "@/components/itineraryEditor";
import { FormComponentProps } from "antd/es/form";
import intl from "react-intl-universal";
import {request} from "@/fetchServerData/axios";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

interface IUserFormProps extends FormComponentProps {
    wrappedComponentRef: any;
    visible: any;
    onCancel: any;
    onSave: any;
    uploadFile: any;
    uploadList: any[];
  }
interface IUserFormStates {
    [index: string]: any[];
  }

const {Option} = Select;

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
              width="1000px"
              visible={visible}
              title={intl.get("components.newSpots.createNewSpot")}
              okText={intl.get("components.newSpots.save")}
              onCancel={onCancel}
              onOk={() => this.handleSubmit()}
            >
              <div styleName="new-spot-modal">
                <Form>
                  <Form.Item>
                    <span styleName="label-spot">{intl.get("components.newSpots.label_spot_name")}</span>
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
                      <Form.Item label={intl.get("components.newSpots.spot_name")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        {getFieldDecorator("spotName", {rules: [{ required: true, message: intl.get("components.newSpots.reminder_spot_name")}]})(
                          <Input/>,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <span>坐标</span>
                  </Form.Item>
                  <Row>
                    <Col span={8}>
                      <Form.Item label={intl.get("components.newSpots.label_spot_latitute")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        {getFieldDecorator("spotLatitute")(
                          <Input/>,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={intl.get("components.newSpots.label_spot_longitude")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        {getFieldDecorator("spotLongitude")(
                          <Input/>,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                      <Form.Item>
                        <Button>{intl.get("components.newSpots.label_spot_selectFromMap")}</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <span>{intl.get("components.newSpots.label_spot_time")}</span>
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("spotTime", {rules: [{ required: true, message: intl.get("components.newSpots.reminder_spot_time")}]})(
                        <DatePicker showTime placeholder="Select Time"/>,
                      )}
                  </Form.Item>
                  <Form.Item>
                    <span>{intl.get("components.newSpots.label_route")}</span>
                  </Form.Item>
                  <Form.Item>
                    {intl.get("components.newSpots.label_route_from")}
                    {
                    getFieldDecorator("fromSpot")(
                      <Select style={{ width: 120, margin: "0 10px" }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>,
                      )}
                    {intl.get("components.newSpots.label_route_to")}
                    {intl.get("components.newSpots.label_route_here")}
                  </Form.Item>
                  <Row>
                    <Col span={8}>
                      <Form.Item label={intl.get("components.newSpots.label_route_vehicle")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        {getFieldDecorator("routeVehicle")(
                          <MySelect onChange={(val) => this.queryNextDropDownData({level: 4, ...val})} dropDownData={this.state.level4DropDownCurrentData}/>,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={intl.get("components.newSpots.label_route_cost")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        {getFieldDecorator("routeCost")(
                          <MySelect onChange={(val) => this.queryNextDropDownData({level: 5, ...val})} dropDownData={this.state.level5DropDownCurrentData}/>,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item label={intl.get("components.newSpots.label_route_time")} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        {getFieldDecorator("routeTime")(
                          <MySelect onChange={(val) => this.queryNextDropDownData({level: 5, ...val})} dropDownData={this.state.level5DropDownCurrentData}/>,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                      {getFieldDecorator("spotDescription")(
                        <ItineraryEditor onChange={() => {}} uploadFile={this.props.uploadFile} uploadList={this.props.uploadList}/>,
                      )}
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          );
        }
    },
  );

function mapStateToProps(state: any) {
  return {
    uploadList: state.uploadList,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(NewSpots);
// export default NewSpots;
