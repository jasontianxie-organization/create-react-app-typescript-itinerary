import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import UploadModal from "@/components/upload";
import ItineraryEditor from "@/components/itineraryEditor";
import { Button } from "antd";
import { connect } from "react-redux";

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
    public handleUpload = () => {
      const { form } = this.formRef.props;
      form.validateFields((err: any, values: any) => {
        if (err) {
          return;
        }
        // console.log("Received values of form: ", values);
        this.props.uploadFile({destUrl: "/api/uploads/parts", file: values})
        form.resetFields();
        this.setState({ uploadModalVisible: false });
      });
    }
    public saveFormRef = (formRef: any) => {
      this.formRef = formRef;
    }
    public render() {
        return (<div styleName="new-itinerary">
                      <div styleName="wrap">
                        <div styleName="content"></div>
                        <div styleName="abstract"></div>
                        <div styleName="map"></div>
                      </div>
                     {/* <Button type="primary" onClick={this.showModal}>{intl.get("pages.newItinerary.uploadBotton")}</Button>
                     <UploadModal
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.uploadModalVisible}
                      onCancel={this.handleCancel}
                      onUpload={this.handleUpload}
                    />
                    <ItineraryEditor/>
                    <div>{intl.get("pages.newItinerary.content")}</div> */}
                </div>);
    }
}

function mapStateToProps(state: any) {
    return {
      uploadList: state.uploadList,
    };
  }
  
  function mapDispatchToProps(dispatch: any) {
    return {
      uploadFile: (combinedFile: any) => dispatch({type:'UPLOAD_FILE', payload: combinedFile}),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(NewItinerary);
