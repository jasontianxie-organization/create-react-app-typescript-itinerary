import React, { useEffect, useState } from "react";
import "./index.module.scss";
import {Modal, message} from "antd";
import intl from "react-intl-universal";
import {request} from "@/fetchServerData/axios";
import { connect } from "react-redux";
import {AxiosResponse} from "axios";
import {useHistory} from "react-router-dom";

type funcType = (show: boolean) => void;
interface IWprops {
    visible: boolean;
    setVisible: funcType;
    userid: number;
}
interface IItineraries {
  userId: number;
  itineraryId: number;
  title: string;
  draft: number;
}

// type PropsType = RouteComponentProps<any> & {
//     visible: boolean;
//     setVisible: funcType;
//     userid: number;
// };

const WriteItinerary: React.FC<IWprops> =  ({visible, setVisible, userid}) => {
    const [itineraries, setItineraries] = useState<IItineraries[]>([]);
    const history = useHistory();
    useEffect(() => {
        request.get<any, IItineraries[]>("/api/itineraries/list", {
            params: {
              userid,
            },
          }).then((data) => {
            setItineraries(data);
        }).catch((err) => console.log(err));
    }, [userid]);
    const newItinerary = () => {
        request.post<any, any>("/api/itineraries/create", {
            userId: userid,
          }).then((data) => {
              if (data.code === 0) {
                message.success(data.message);
                history.push(`/newItinerary/${data.data.itineraryId}`);
              } else {
                message.error(data.message);
              }
        }).catch((err) => console.log(err));
    };
    return (
        <Modal
            footer={null}
            title={intl.get("components.writeItinerary.title")}
            onCancel={() => setVisible(false)}
            visible={visible}
        >
            <div onClick={newItinerary}>{intl.get("components.writeItinerary.new")}</div>
            {itineraries && itineraries.map((item, index) => {
                if (item.draft === 0) {
                    return <div key={index} onClick={() => history.push(`/newItinerary/${item.itineraryId}`)}>{item.title || "无标题游记"}</div>;
                }
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
