
import React from "react";
import "./index.module.scss";
// import intl from "react-intl-universal";
import { Modal, Form, Upload, Button, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";

interface IUserFormProps extends FormComponentProps {
    wrappedComponentRef: any;
    visible: any;
    onCancel: any;
    onUpload: any;
  }

const UploadModal = Form.create<IUserFormProps>({ name: "form_in_modal" })(
    class extends React.Component<IUserFormProps, any> {
    public state = {
      uploadFileName: "null",
      uploadFileSize: "0",
    };
    public render() {
        const { visible, onCancel, onUpload, form } = this.props;
        const { getFieldDecorator } = form;
        const props = {
            beforeUpload: (file: any) => {
              return false;
            },
            onRemove: () => true,
            showUploadList: false,
            onChange: (val: any) => {
              this.setState({...this.state, uploadFileName: val.file.name, uploadFileSize: val.file.size});
            },
          };
        return (
          <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            onCancel={onCancel}
            onOk={onUpload}
          >
            <Form layout="vertical">
              <Form.Item label="upload file">
                {getFieldDecorator("antdFile", {
                  rules: [{ required: true, message: "Please select a file!"}],
                })(<Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Select File
                    </Button>
                  </Upload>)}
              </Form.Item>
              <Form.Item>
                <span>{`Name:${this.state.uploadFileName}/Size:${this.state.uploadFileSize}`}</span>
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );

export default UploadModal;
