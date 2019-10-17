import React from "react";
import App from "@/pages/main/App";
import NewItinerary from "@/pages/newItinerary/index";
import {Route} from "react-router-dom";
import intl from "react-intl-universal";

import en_US from "@/i18n/en_US";
import zh_CN from "@/i18n/zh_CN";
import "intl/locale-data/jsonp/en.js";
import "intl/locale-data/jsonp/zh.js";

// app locale data
const locales = {
    en_US,
    zh_CN,
  };

class Entry extends React.Component<any, any> {
    public state = {initDone: false};

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
                <Route exact path="/" component={App}/>
                <Route path="/newItinerary" component={NewItinerary}/>
              </>
            )
        );
    }
}

export default Entry;
