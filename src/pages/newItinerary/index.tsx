import React from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import Upload from "@/components/upload"

class NewItinerary extends React.Component<any, any> {
    public render() {
        return (<div>
            <Upload/>
            <div>{intl.get("pages.newItinerary.content")}</div>
        </div>);
    }
}

export default NewItinerary;
