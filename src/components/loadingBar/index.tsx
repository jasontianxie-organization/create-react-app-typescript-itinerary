import React from "react";
import "./index.module.scss";
import {request} from "@/fetchServerData/axios";
import store from "@/redux/store";

class LoadingBar extends React.Component<any, any> {
    public state = {color: "#1890ff", width: 0, show: false};
    public Interval: any;
    public componentDidMount() {
        request.get("/api/users/session").then((data) => {
            store.dispatch({type: "LOGIN_SUCCESS", payload: data});
        }).catch((err) => console.log(err));
    }
    public startRequest() {
        let width: number = 0;
        this.endRequest();
        this.Interval = setInterval(() => {
            width = width + Math.ceil(Math.random() * 5);
            if (width > 95) {
                clearInterval(this.Interval);
            }
            this.showProgress({...this.state, width, show: true});
        }, 200);
      }
    public endRequest() {
        if (this.Interval) {
            clearInterval(this.Interval);
        }
        this.showProgress({color: "#1890ff", width: 100, show: true});
        this.hideLoadingBar();
    }
    public error() {
        if (this.Interval) {
            clearInterval(this.Interval);
        }
        this.showProgress({color: "#ff4d4f", width: 100, show: true});
        this.hideLoadingBar();
    }
    public showProgress(data: any) {
        this.setState(data);
    }
    public hideLoadingBar() {
        setTimeout(() => {
            this.setState({color: "#1890ff", width: 0, show: false});
        }, 800);
    }
    public render() {
        const {color, width, show} = this.state;
        return (
            <div styleName="loading-bar" style={{backgroundColor: color, width: width + "%", display: show ? "block" : "none"}}></div>
        );
    }
}

export default LoadingBar;
