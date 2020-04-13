import React, { useEffect, useState } from "react";
import "./index.module.scss";
import {Modal} from "antd";
import intl from "react-intl-universal";
import {request} from "@/fetchServerData/axios";
import { connect } from "react-redux";
import {AxiosResponse} from "axios";

type funcType = (show: boolean) => void;
interface IWprops {
    visible: boolean;
    setVisible: funcType;
    userid: number;
}
interface IItineraries {
  userId: number;
  itineraryId: number;
}

const WriteItinerary: React.FC<IWprops> =  ({visible, setVisible, userid}) => {
    const [itineraries, setItineraries] = useState<IItineraries[]>([]);
    useEffect(() => {
        request.get<any, IItineraries[]>("/api/itineraries/list", {
            params: {
              userid,
            },
          }).then((data) => {
            setItineraries(data);
        });
    }, [userid]);
    return (
        <Modal
            footer={null}
            title={intl.get("components.writeItinerary.title")}
            onCancel={() => setVisible(false)}
            visible={visible}
        >
            {itineraries && itineraries.map((item, index) => {
                return <a key={index}>{item.itineraryId}</a>;
            })}
      </Modal>
    );
};

function mapStateToProps(state: any) {
    return {
        userid: state.users.data && state.users.data.id,
    };
  }

function mapDispatchToProps(dispatch: any) {
    return {
        // onIncreaseClick: () => dispatch({}),
        // showLogin: () => dispatch({type: "SHOW_LOGIN"}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteItinerary);
