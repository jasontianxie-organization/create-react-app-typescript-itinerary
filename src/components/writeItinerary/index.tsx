import React from "react";
import "./index.module.scss";
import {Modal} from "antd";
import intl from "react-intl-universal";

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

export default WriteItinerary;
