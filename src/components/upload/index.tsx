import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import { Button, Icon, message } from "antd";

class Upload extends React.Component<any, any> {
    private static state = {
        fileList: [],
    };
    public render() {
        return (
        <div>
            <div styleName="upload-button">
                <input type="file" style={{display: "none"}}/>
            </div>
            <div styleName="uploading-list">
                {}
            </div>
        </div>);
    }
}

export default Upload;
