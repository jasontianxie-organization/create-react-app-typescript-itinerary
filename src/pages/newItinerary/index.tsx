import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import NewSpots from "@/components/newSpots";
// import ItineraryEditor from "@/components/itineraryEditor";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import { uploadFileAction } from "@/redux/actions/uploadFile";
import { request } from "@/fetchServerData/axios";

interface ISpotLists {
  spotId: number;
  spotOrder: number;
  description: string;
  itineraryId: number;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  spotName: string;
  spotNameCN: string;
  spotNamePY: string;
  longitude: number;
  latitude: number;
  time: number;
  itinerary: {title: string};
}

class NewItinerary extends React.Component<any, any> {
    public formRef: any;
    public mainRef: any;
    public mainWrapRef: any;
    public resizeTimer: any = null;
    public state = {
      newSpotsModalVisible: false,
      title: "",
      content: [],
    };
    public showModal = () => {
      this.setState({ newSpotsModalVisible: true });
    }
    public handleCancel = () => {
      // this.formRef.props.form.resetFields();
      this.setState({ newSpotsModalVisible: false });
      this.props.updateCurrentSpotId(null);
    }
    public handleSave(data: {title: string}) { // 保存当前地点的信息
      request.post("/api/spots/update", data).then((res: any) => {
        this.formRef.props.form.resetFields();
        this.setState({ newSpotsModalVisible: false });
        this.props.updateSpots(res.spotId);
        this.props.updateCurrentSpotId(null);
        this.props.updateItineraries(res.itineraryId);
      }).catch((err) => {
        console.log(err);
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
    public changeTitle(e: any) {
      this.setState({title: e.target.value})
    }
    public generateContent(data: ISpotLists[]) {
      const content: Array<{spotOrder: number, spotName: string, description: string}> = [];
      data.forEach((d) => {
        if (content.length) {
          let temp: number = 0;
          content.forEach((c, index) => {
            if (d.spotOrder > c.spotOrder) {
              temp = index;
            }
          });
          content.splice(temp + 1, 0, {spotOrder: d.spotOrder, spotName: d.spotName, description: d.description});
        } else {
          content[0] = {spotOrder: d.spotOrder, spotName: d.spotName, description: d.description};
        }
      });
      this.setState({content});
    }
    public setMainWidth() {
      if (this.mainRef) {
        this.mainRef.style.width = this.mainWrapRef.offsetWidth + this.mainRef.offsetWidth - this.mainRef.clientWidth + "px";
        this.mainRef.style.height = this.mainWrapRef.clientHeight - 40 + "px"; // 这里的40px是main-wrap的padding值
      }
    }
    public componentWillMount() {
      const {itineraryId} = this.props.match.params;
      if (itineraryId === "new") {
        return;
      }
      request.get<any, ISpotLists[]>("/api/spots/list", {
        params: {
          itineraryId,
        },
      }).then((res: ISpotLists[]) => {
        this.setState({title: res[0].itinerary.title});
        this.generateContent(res);
      }).catch((err) => console.log(err));;
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
                        <div styleName="abstract">
                          {this.state.content.map((item: {spotOrder: number, spotName: string, description: string}, index: number) => {
                          return <div key={index}>{item.spotOrder}/ {item.spotName}</div>;
                          })}
                        </div>
                        <div styleName="content">
                          <div styleName="title">
                            <Input
                            onChange={(e) => this.changeTitle(e)}
                            value={this.state.title}
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
                                  this.state.content.map((i: {spotOrder: number, description: string}) => {
                                    return <p key={i.spotOrder} dangerouslySetInnerHTML={{__html: i.description}}></p>;
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
                        onSave={(data: any) => this.handleSave(data)}
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
      spots: state.spots,
    };
  }

function mapDispatchToProps(dispatch: any) {
  return {
    uploadFile: (combinedFile: any) => dispatch(uploadFileAction(combinedFile)),
    updateCurrentSpotId: (id: any) => dispatch({type: "UPDATE_CURRENT_SPOT_ID", payload: id}),
    updateSpots: (spotId: number) => dispatch({type: "UPDATE_SPOTS", payload: spotId}),
    updateItineraries: (itineraryId: number) => dispatch({type: "UPDATE_CURRENT_ITINERARY_ID", payload: itineraryId})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItinerary);
