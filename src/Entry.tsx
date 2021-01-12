import React from "react";
import App from "@/pages/main/App";
import NewItinerary from "@/pages/newItinerary/index";
import LoadingBar from "@/components/loadingBar";
import {Route, Switch, Redirect} from "react-router-dom";
import PrivateRoute from "@/router/auth";
import intl from "react-intl-universal";
import Signin from "@/pages/Signin";
import "./init.scss";

import en_US from "@/i18n/en_US";
import zh_CN from "@/i18n/zh_CN";
import "intl/locale-data/jsonp/en.js";
import "intl/locale-data/jsonp/zh.js";

// app locale data
const locales = {
    en_US,
    zh_CN,
  };
export const loadingBarRef = React.createRef();

class Entry extends React.Component<any, any> {
    private myRef: any;
    public constructor(props: any) {
      super(props);
      this.state = {initDone: false};
      this.myRef = loadingBarRef;
    }
    public componentDidMount() {
        this.loadLocales();
      }
    public loadLocales() {
        // init method will load CLDR locale data according to currentLocale
        // react-intl-universal is singleton, so you should init it only once in your app
        intl.init({
          currentLocale: "zh_CN", // TODO: determine locale here
          locales,
        })
        .then(() => {
          // After loading CLDR locale data, start to render
          this.setState({initDone: true});
        });
      }
    public render() {
        return (
            this.state.initDone && (
              <>
                <LoadingBar ref={this.myRef}/>
                <Switch>
                  <Route exact path="/signin" render={() => <Signin/>}/>
                  <Route exact path="/signup" render={() => <Signin/>}/>
                  <Route exact path="/">
                    <Redirect to="/main" />
                  </Route>
                  <Route path="/main" render={() => <App/>}></Route>
                  <PrivateRoute path="/newItinerary/:itineraryId" component={NewItinerary}/>
                  <Route path="*">
                    <h1>404</h1>
                  </Route>
                </Switch>
              </>
            )
        );
    }
}

export default Entry;
