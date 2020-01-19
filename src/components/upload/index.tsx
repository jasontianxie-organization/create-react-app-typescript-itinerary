
import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import { Modal, Form, Upload, Button, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";
import utils from "@/utils/functions";

interface IUserFormProps extends FormComponentProps {
    wrappedComponentRef: any;
    visible: any;
    onCancel: any;
    onUpload: any;
  }

const UploadModal = Form.create<IUserFormProps>({ name: "form_in_modal" })(
    class extends React.Component<IUserFormProps, any> {
    public state = {
      uploadFileName: null,
      uploadFileSize: 0,
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
            title={intl.get("components.upload.title_modal")}
            okText={intl.get("components.upload.btn_ok")}
            onCancel={onCancel}
            onOk={onUpload}
          >
            <Form layout="vertical">
              <Form.Item>
                {getFieldDecorator("antdFile", {
                  rules: [{ required: true, message: intl.get("components.upload.remider_empty_file")}],
                })(<Upload {...props}>
                    <Button>
                      <Icon type="upload" /> {intl.get("components.upload.label_icon")}
                    </Button>
                  </Upload>)}
              </Form.Item>
              <Form.Item style={{display: this.state.uploadFileName ? "block" : "none"}}>
                <div>{intl.get("components.upload.label_file_name")}{this.state.uploadFileName}</div>
                <div>{intl.get("components.upload.label_file_size")}{utils.getfilesize(this.state.uploadFileSize)}</div>
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );

export default UploadModal;
