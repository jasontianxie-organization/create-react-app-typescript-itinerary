import React from "react";
import "./index.module.scss";

class LoadingBar extends React.Component<any, any> {
    public state = {color: "#1890ff", width: 0, show: false}; // #ff4d4f
    public startRequest() {
        let width: number = 0;
        let Interval: any = null;
        Interval = setInterval(() => {
            width = width + Math.ceil(Math.random() * 5);
            if (width > 95) {
                clearInterval(Interval);
            }
        }, 200);
        this.setState({})
      }
    public endRequest() {
        
    }
    public error() {
        
    }
    public render() {
        return (
            <div styleName="loading-bar"></div>
        );
    }
}

export default LoadingBar;
