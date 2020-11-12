import React, { useEffect, useState } from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import { connect } from "react-redux";

interface IWprops {
  userData: {
    username: string
  },
  showLogin: () => void
}

const Header: React.FC<IWprops> =  ({userData, showLogin}) => {
  return (
    <div styleName="header">
      {
        userData.username ? (
          <span>{userData.username}</span>
        ) :  (
          <span>
            <span onClick={() => showLogin()}>{intl.get("components.header.signin")}</span>
            <span>{intl.get("components.header.signup")}</span>
          </span>
        )
      }
    </div>
  )
}


function mapStateToProps(state: any) {
  return {
    userData: state.users.data,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    showLogin: () => dispatch({type: "SHOW_LOGIN"}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header