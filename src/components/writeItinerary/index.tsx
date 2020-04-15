import React, { useEffect, useState } from "react";
import "./index.module.scss";
import {Modal} from "antd";
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
        });
    }, [userid]);
    return (
        <Modal
            footer={null}
            title={intl.get("components.writeItinerary.title")}
            onCancel={() => setVisible(false)}
            visible={visible}
        >
            <div onClick={() => history.push("/newItinerary/new")}>{intl.get("components.writeItinerary.new")}</div>
            {itineraries && itineraries.map((item, index) => {
                if (item.draft === 0) {
                    return <div key={index} onClick={() => history.push(`/newItinerary/${item.itineraryId}`)}>{item.title}</div>;
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
