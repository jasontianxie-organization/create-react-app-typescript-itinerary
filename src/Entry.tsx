import React from "react";
import App from "@/pages/main/App";
import NewItinerary from "@/pages/newItinerary/index";
import Login from "@/components/login";
import LoadingBar from "@/components/loadingBar";
import Header from "@/components/header";
import {Route} from "react-router-dom";
import intl from "react-intl-universal";
// import { connect } from "react-redux";
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
                <Header/>
                {/* <Login/> */}
                <Route exact path="/" render={() => <App/>}/>
                <Route path="/newItinerary/:itineraryId" component={NewItinerary}/>
              </>
            )
        );
    }
}


// function mapStateToProps(state: any) {
//   return {
//     userData: state.users.data,
//   };
// }

// function mapDispatchToProps(dispatch: any) {
//   return {
    
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Entry);
// export default Entry;
