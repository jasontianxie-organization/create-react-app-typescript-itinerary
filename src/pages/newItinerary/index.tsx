import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";

class NewItinerary extends React.Component<any, any> {
    public render() {
        return <div>{intl.get("pages.newItinerary.content")}</div>;
    }
}

export default NewItinerary;
