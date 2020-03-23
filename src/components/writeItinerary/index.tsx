import React from "react";
import "./index.module.scss";
import {Modal} from "antd";
import intl from "react-intl-universal";
import {request} from "@/fetchServerData/axios";
import { connect } from "react-redux";

type funcType = (show: boolean) => void;
interface IWprops {
    visible: boolean;
    setVisible: funcType;
}

const WriteItinerary: React.FC<IWprops> =  ({visible, setVisible}) => {
    // const [visible, setVisible] = React.useState(visibleOrNot);
    return (
        <Modal
            footer={null}
            title={intl.get("components.writeItinerary.title")}
            onCancel={() => setVisible(false)}
            visible={visible}
        >
            this is content
      </Modal>
    );
};

function mapStateToProps(state: any) {
    return {
      userData: state.users.data,
    };
  }

function mapDispatchToProps(dispatch: any) {
    return {
        // onIncreaseClick: () => dispatch({}),
        // showLogin: () => dispatch({type: "SHOW_LOGIN"}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteItinerary);
