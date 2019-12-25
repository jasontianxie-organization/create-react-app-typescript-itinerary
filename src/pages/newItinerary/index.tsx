import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import UploadModal from "@/components/upload";
import ItineraryEditor from "@/components/itineraryEditor";
import { Button, Input } from "antd";
import { connect } from "react-redux";

class NewItinerary extends React.Component<any, any> {
    public formRef: any;
    public mainRef: any;
    public mainWrapRef: any;
    public resizeTimer: any = null;
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
    public getMain = (mainRef: any) => {
      this.mainRef = mainRef;
    }
    public getMainWrap = (mainWrapRef: any) => {
      this.mainWrapRef = mainWrapRef;
    }
    public saveTitle() {
      console.log("title saved");
    }
    public setMainWidth() {
      this.mainRef.style.width = this.mainWrapRef.offsetWidth + this.mainRef.offsetWidth - this.mainRef.clientWidth + "px";
    }
    public componentDidMount() {
      this.setMainWidth();
      window.addEventListener("resize", () => {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
              this.setMainWidth();
          }, 100);
      });
    }
    public render() {
        return (<div styleName="new-itinerary">
                      <div styleName="wrap">
                        <div styleName="abstract"></div>
                        <div styleName="content">
                          <div styleName="title">
                            <Input
                            placeholder={intl.get("pages.newItinerary.placeholder_title")}
                            addonAfter={
                              <span styleName="save-title" onClick={() => this.saveTitle()}>
                                {intl.get("pages.newItinerary.btn_save")}
                              </span>}/>
                          </div>
                          <div styleName="preview">
                            <div styleName="pre-title">
                              <Button type="primary">{intl.get("pages.newItinerary.btn_add")}</Button>
                            </div>
                            <div styleName="main-wrap" ref={this.getMainWrap}>
                              <div styleName="main" ref={this.getMain}>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                this is a test<br/>
                                </div>
                            </div>
                          </div>
                          <div styleName="add-new"></div>
                        </div>
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
