// import "./react-app-env.d.ts";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {HashRouter} from "react-router-dom";
import "@/init";
import Entry from "@/Entry";
import * as serviceWorker from "./serviceWorker";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import store from "@/redux/store";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <ConfigProvider locale={zhCN}>
                <Entry />
            </ConfigProvider>
        </HashRouter>
    </Provider>
,
document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
