import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import NewSpots from "@/components/newSpots";
// import ItineraryEditor from "@/components/itineraryEditor";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import { uploadFileAction } from "@/redux/actions/newItinerary";

class NewItinerary extends React.Component<any, any> {
    public formRef: any;
    public mainRef: any;
    public mainWrapRef: any;
    public resizeTimer: any = null;
    public state = {
      newSpotsModalVisible: false,
    };
    public showModal = () => {
      this.setState({ newSpotsModalVisible: true });
    }
    public handleCancel = () => {
      this.setState({ newSpotsModalVisible: false });
    }
    public handleSave() {
      this.setState({ newSpotsModalVisible: false });
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
    public generate() {
      const num: number[] = [];
      for (let i = 0; i < 30; i++) {
        num[i] = i;
      }
      return num;
    }
    public setMainWidth() {
      this.mainRef.style.width = this.mainWrapRef.offsetWidth + this.mainRef.offsetWidth - this.mainRef.clientWidth + "px";
      this.mainRef.style.height = this.mainWrapRef.clientHeight - 40 + "px"; // 这里的40px是main-wrap的padding值
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
                              <Button type="primary" onClick={this.showModal}>{intl.get("pages.newItinerary.btn_add")}</Button>
                            </div>
                            <div styleName="main-wrap" ref={this.getMainWrap}>
                              <div styleName="main" ref={this.getMain}>
                                {
                                  this.generate().map((i) => {
                                    return <p key={i}>this is a test</p>;
                                  })
                                }
                                </div>
                            </div>
                          </div>
                          <div styleName="add-new"></div>
                        </div>
                        <div styleName="map"></div>
                      </div>
                      <NewSpots
                        wrappedComponentRef={this.saveFormRef} // 经过 Form.create 包装的组件将会自带 this.props.form 属性
                        visible={this.state.newSpotsModalVisible}
                        onCancel={() => this.handleCancel()}
                        onSave={() => this.handleSave()}
                        uploadFile={this.props.uploadFile}
                      />
                     {/* <Button type="primary" onClick={this.showModal}>{intl.get("pages.newItinerary.uploadBotton")}</Button>
                     <UploadModal
                      wrappedComponentRef={this.saveFormRef} // 经过 Form.create 包装的组件将会自带 this.props.form 属性
                      visible={this.state.newSpotsModalVisible}
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
    uploadFile: (combinedFile: any) => dispatch(uploadFileAction(combinedFile)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItinerary);
