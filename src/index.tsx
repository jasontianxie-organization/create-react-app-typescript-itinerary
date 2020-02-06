// import "./react-app-env.d.ts";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {HashRouter} from "react-router-dom";
import "@/init";
import Entry from "@/Entry";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "@/redux/reducers/index";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

const store = createStore(rootReducer, applyMiddleware(thunk));

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
