
import React from "react";
import "./index.module.scss";
import { Modal, Form, Upload, Button, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";

interface IUserFormProps extends FormComponentProps {
    wrappedComponentRef: any;
    visible: any;
    onCancel: any;
    onSave: any;
  }

const NewSpots = Form.create<IUserFormProps>({ name: "new_spots" })(
    class extends React.Component<IUserFormProps, any> {
    public state = {
    };
    public render() {
        const { visible, onCancel, onSave, form } = this.props;
        const { getFieldDecorator } = form;
        // const props = {
        //     beforeUpload: (file: any) => {
        //       return false;
        //     },
        //     onRemove: () => true,
        //     showUploadList: false,
        //     onChange: (val: any) => {
        //       this.setState({...this.state, uploadFileName: val.file.name, uploadFileSize: val.file.size});
        //     },
        //   };
        return (
          <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            onCancel={onCancel}
            onOk={onSave}
          >
            <Form layout="vertical">
              <Form.Item>
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );

export default NewSpots;
