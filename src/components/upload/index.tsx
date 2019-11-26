
import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import { Modal, Form, Upload, Button, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";

interface IUserFormProps extends FormComponentProps {
    wrappedComponentRef: any;
    visible: any;
    onCancel: any;
    onCreate: any;
  }

const UploadModal = Form.create<IUserFormProps>({ name: "form_in_modal" })(
    // eslint-disable-next-line
    class extends React.Component<IUserFormProps, any> {
    public state = {
        fileList: [],
        uploading: false,
    };
    public handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file: any) => {
          formData.append("files[]", file);
        });
        this.setState({
          uploading: true,
        });
    }
    public render() {
        const { uploading, fileList } = this.state;
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        const props = {
            onRemove: (file: any) => {
              this.setState((state: any) => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: (file: any) => {
              this.setState((state: any) => ({
                fileList: [...state.fileList, file],
              }));
              return false;
            },
            fileList,
          };
        return (
          <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="upload file">
                {getFieldDecorator("file", {
                  rules: [{ required: true, message: "Please select a file!"}],
                })(<Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Select File
                    </Button>
                  </Upload>)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );

export default UploadModal;
