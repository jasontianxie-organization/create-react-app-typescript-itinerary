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
            this.showProgress({...this.state, width, show: true});
        }, 200);
      }
    public endRequest() {
        this.showProgress({color: "#1890ff", width: 100, show: true});
        this.hideLoadingBar();
    }
    public error() {
        this.showProgress({color: "#ff4d4f", width: 100, show: true});
        this.hideLoadingBar();
    }
    public showProgress(data) {
        this.setState(data);
    }
    public hideLoadingBar() {
        this.setState({color: "#1890ff", width: 0, show: false});
    }
    public render() {
        const {color, width, show} = this.state;
        return (
            <div styleName="loading-bar" style={{backgroundColor: color, width, display: show ? "block" : "none"}}></div>
        );
    }
}

export default LoadingBar;
