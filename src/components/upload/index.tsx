import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import { Button, Icon } from "antd";

class Upload extends React.Component<any, any> {
    private static state = {
        fileList: [],
    };
    private myRef: any;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }
    public render() {
        return (
        <div>
            <div styleName="upload-button">
                <input type="file" style={{display: "none"}} ref={this.myRef}/>
                <Button onClick = {() => this.myRef.current.click()}>
                    <Icon type="upload" /> {intl.get("components.upload.uploadButton")}
                </Button>
            </div>
            <div styleName="uploading-list">
                {}
            </div>
        </div>);
    }
}

export default Upload;
