import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import UploadModal from "@/components/upload";
import { Button} from "antd";

class NewItinerary extends React.Component<any, any> {
    public formRef: any;
    public state = {
      uploadModalVisible: false,
    };
    public showModal = () => {
      this.setState({ uploadModalVisible: true });
    }
    public handleCancel = () => {
      this.setState({ uploadModalVisible: false });
    }
    public handleCreate = () => {
      const { form } = this.formRef.props;
      form.validateFields((err: any, values: any) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        form.resetFields();
        this.setState({ uploadModalVisible: false });
      });
    }
    public saveFormRef = (formRef: any) => {
      this.formRef = formRef;
    }
    public render() {
        return (<div>
            <Button type="primary" onClick={this.showModal}>{intl.get("pages.newItinerary.uploadBotton")}</Button>
            <UploadModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.uploadModalVisible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
            <div>{intl.get("pages.newItinerary.content")}</div>
        </div>);
    }
}

export default NewItinerary;
